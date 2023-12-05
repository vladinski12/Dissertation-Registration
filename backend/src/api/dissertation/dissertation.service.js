import Prisma from '../../prisma.js';
import {
  DissertationRequestStatus,
  MAX_NUMBER_OF_STUDENTS_PER_PROFESSOR,
  UserRole,
} from '../../utils/constants.js';
import HttpException from '../../utils/http-exception.js';

export async function createDissertationRequest(studentId, professorId) {
  const student = await Prisma.student.findUnique({
    where: {
      id: studentId,
    },
    include: {
      dissertationRequests: true,
    },
  });
  if (!student) {
    throw new HttpException('Student not found', 404);
  }

  if (
    student.dissertationRequests.filter(
      (dissertationRequest) =>
        dissertationRequest.status === DissertationRequestStatus.APPROVED
    ).length > 0
  ) {
    throw new HttpException(
      'Student already has approved dissertation request',
      400
    );
  }

  const professor = await Prisma.professor.findUnique({
    where: {
      id: professorId,
    },
    include: {
      DissertationRequests: true,
      RegistrationSessions: true,
    },
  });
  if (!professor) {
    throw new HttpException('Professor not found');
  }

  const existingDissertationRequest =
    await Prisma.dissertationRequests.findFirst({
      where: {
        studentId,
        professorId,
      },
    });

  if (existingDissertationRequest) {
    throw new HttpException(
      'Dissertation request already exists for this student and professor',
      400
    );
  }

  if (
    professor.DissertationRequests.filter(
      (dissertationRequest) =>
        dissertationRequest.status === DissertationRequestStatus.APPROVED
    ).length >= MAX_NUMBER_OF_STUDENTS_PER_PROFESSOR
  ) {
    throw new HttpException('Professor is full', 400);
  }

  if (
    !professor.RegistrationSessions.any(
      (session) =>
        session.endDate > new Date() && session.startDate < new Date()
    )
  ) {
    throw new HttpException('Professor is not available', 400);
  }

  return Prisma.dissertationRequests.create({
    data: {
      student: {
        connect: {
          id: studentId,
        },
      },
      professor: {
        connect: {
          id: professorId,
        },
      },
    },
  });
}

export async function getDissertationRequests(userId) {
  const user = await Prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new HttpException('User not found', 404);
  }

  if (user.role === UserRole.PROFESSOR) {
    const professor = await Prisma.professor.findUnique({
      where: {
        userId: user.id,
      },
      include: {
        DissertationRequests: {
          include: {
            studentFile: true,
            professorFile: true,
          },
        },
      },
    });
    if (!professor) {
      throw new HttpException('Professor not found', 404);
    }

    return professor.DissertationRequests;
  } else if (user.role === UserRole.STUDENT) {
    const student = await Prisma.student.findUnique({
      where: {
        id: user.studentId,
      },
      include: {
        dissertationRequests: {
          include: {
            studentFile: true,
            professorFile: true,
          },
        },
      },
    });
    if (!student) {
      throw new HttpException('Student not found', 404);
    }

    return student.dissertationRequests;
  } else {
    throw new HttpException('Invalid user role', 400);
  }
}

export async function handlePreliminaryDissertationRequest(
  professorId,
  dissertationRequestId,
  status,
  declinedReason
) {
  if (
    status !== DissertationRequestStatus.APPROVED &&
    status !== DissertationRequestStatus.DECLINED
  ) {
    throw new HttpException('Invalid status', 400);
  }

  const professor = await Prisma.professor.findUnique({
    where: {
      id: professorId,
    },
    include: {
      DissertationRequests: true,
    },
  });

  if (!professor) {
    throw new HttpException('Professor not found', 404);
  }

  const dissertationRequest = professor.DissertationRequests.find(
    (dissertationRequest) => dissertationRequest.id === dissertationRequestId
  );

  if (!dissertationRequest) {
    throw new HttpException('Dissertation request not found', 404);
  }

  if (
    dissertationRequest.status !== DissertationRequestStatus.PENDING_APPROVAL
  ) {
    throw new HttpException('Dissertation request is not pending', 400);
  }

  if (
    status === DissertationRequestStatus.APPROVED &&
    professor.DissertationRequests.filter(
      (dissertationRequest) =>
        dissertationRequest.status === DissertationRequestStatus.APPROVED
    ).length >= MAX_NUMBER_OF_STUDENTS_PER_PROFESSOR
  ) {
    throw new HttpException('Professor is full', 400);
  }

  return Prisma.dissertationRequests.update({
    where: {
      id: dissertationRequestId,
    },
    data: {
      status,
      declinedReason: declinedReason || undefined,
    },
  });
}

export async function uploadDissertationRequest(
  studentId,
  dissertationRequestId,
  filename,
  path
) {
  const student = await Prisma.student.findUnique({
    where: {
      id: studentId,
    },
    include: {
      dissertationRequests: true,
    },
  });

  if (!student) {
    throw new HttpException('Student not found', 404);
  }

  const dissertationRequest = student.dissertationRequests.find(
    (dissertationRequest) => dissertationRequest.id === dissertationRequestId
  );

  if (
    !dissertationRequest ||
    student.dissertationRequests.find(
      (dissertationRequest) => dissertationRequest.id !== dissertationRequestId
    )
  ) {
    throw new HttpException('Dissertation request not found', 404);
  }

  if (dissertationRequest.status !== DissertationRequestStatus.APPROVED) {
    throw new HttpException('Dissertation request is not approved', 400);
  }

  const file = await Prisma.file.create({
    data: {
      filename,
      path,
    },
  });

  return Prisma.dissertationRequests.update({
    where: {
      id: dissertationRequestId,
    },
    data: {
      status: DissertationRequestStatus.FILE_UPLOADED_BY_STUDENT,
      studentFile: {
        connect: {
          id: file.id,
        },
      },
    },
  });
}

export async function handleUploadedDissertationRequest(
  professorId,
  dissertationRequestId,
  status,
  declinedReason,
  filename,
  path
) {
  if (
    status !== DissertationRequestStatus.APPROVED_REJECTED &&
    status !== DissertationRequestStatus.FILE_UPLOADED_BY_PROFESSOR
  ) {
    throw new HttpException('Invalid status', 400);
  }

  const professor = await Prisma.professor.findUnique({
    where: {
      id: professorId,
    },
    include: {
      DissertationRequests: true,
    },
  });

  if (!professor) {
    throw new HttpException('Professor not found', 404);
  }

  const dissertationRequest = professor.DissertationRequests.find(
    (dissertationRequest) => dissertationRequest.id === dissertationRequestId
  );

  if (!dissertationRequest) {
    throw new HttpException('Dissertation request not found', 404);
  }

  if (
    dissertationRequest.status !== DissertationRequestStatus.APPROVED_REJECTED
  ) {
    throw new HttpException('Dissertation request is not pending', 400);
  }

  const file = await Prisma.file.create({
    data: {
      filename,
      path,
    },
  });

  return Prisma.dissertationRequests.update({
    where: {
      id: dissertationRequestId,
    },
    data: {
      status,
      declinedReason: declinedReason || undefined,
      professorFile: {
        connect: {
          id: file.id,
        },
      },
    },
  });
}
