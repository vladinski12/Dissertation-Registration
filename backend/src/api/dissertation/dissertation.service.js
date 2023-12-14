import {
  DissertationRequestStatus,
  MAX_NUMBER_OF_STUDENTS_PER_PROFESSOR,
  UserRole,
} from '../../utils/constants.js';
import HttpException from '../../utils/http-exception.js';
import Prisma from '../../prisma.js';

export async function createDissertationRequest(
  studentId,
  professorId,
  studentMessage
) {
  const student = await Prisma.student.findUnique({
    where: {
      userId: studentId,
    },
    include: {
      DissertationRequests: true,
    },
  });

  if (!student) {
    throw new HttpException('Student not found', 404);
  }

  if (
    student.DissertationRequests?.filter(
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
      userId: professorId,
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
    !professor.RegistrationSessions.some(
      (session) =>
        session.endDate > new Date() && session.startDate < new Date()
    )
  ) {
    throw new HttpException('Professor is not available', 400);
  }

  return Prisma.dissertationRequests.create({
    data: {
      studentMessage,
      student: {
        connect: {
          id: student.id,
        },
      },
      professor: {
        connect: {
          id: professor.id,
        },
      },
    },
  });
}

export async function getDissertationRequests(userId) {
  const user = await Prisma.user.findUnique({
    select: {
      role: true,
      id: true,
      email: true,
      name: true,
    },
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
    });
    if (!professor) {
      throw new HttpException('Professor not found', 404);
    }
    const dissertationRequests = await Prisma.dissertationRequests.findMany({
      where: {
        professorId: professor.id,
      },
    });

    return Promise.all(
      dissertationRequests.map(async (dissertationRequest) => ({
        ...dissertationRequest,
        student: await Prisma.student.findUnique({
          where: {
            id: dissertationRequest.studentId,
          },
          include: {
            user: {
              select: {
                id: true,
                email: true,
                name: true,
              },
            },
          },
        }),
        professor: {
          ...professor,
          user,
        },
      }))
    );
  } else if (user.role === UserRole.STUDENT) {
    const student = await Prisma.student.findUnique({
      where: {
        userId: user.id,
      },
    });
    if (!student) {
      throw new HttpException('Student not found', 404);
    }
    const dissertationRequests = await Prisma.dissertationRequests.findMany({
      where: {
        studentId: student.id,
      },
    });
    return Promise.all(
      dissertationRequests.map(async (dissertationRequest) => ({
        ...dissertationRequest,
        student: {
          ...student,
          user,
        },
        professor: await Prisma.professor.findUnique({
          where: {
            id: dissertationRequest.professorId,
          },
          include: {
            user: {
              select: {
                id: true,
                email: true,
                name: true,
              },
            },
          },
        }),
      }))
    );
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
