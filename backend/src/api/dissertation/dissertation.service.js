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

  if (
    student.DissertationRequests?.filter(
      (dissertationRequest) =>
        dissertationRequest.status === DissertationRequestStatus.DECLINED &&
        dissertationRequest.professorId === professorId
    ).length > 0
  ) {
    throw new HttpException(
      'Student already has a declined dissertation request by this professor',
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
        studentId: student.id,
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
      select: {
        DissertationRequests: {
          select: {
            id: true,
            status: true,
            studentMessage: true,
            declinedReason: true,
            createdAt: true,
            student: {
              select: {
                id: true,
                user: {
                  select: {
                    email: true,
                    name: true,
                  },
                },
              },
            },
            studentFile: {
              select: {
                filename: true,
              },
            },
            professorFile: {
              select: {
                filename: true,
              },
            },
          },
        },
      },
      where: {
        userId: user.id,
      },
    });
    if (!professor) {
      throw new HttpException('Professor not found', 404);
    }

    return professor;
  } else if (user.role === UserRole.STUDENT) {
    const student = await Prisma.student.findUnique({
      select: {
        DissertationRequests: {
          select: {
            id: true,
            status: true,
            studentMessage: true,
            declinedReason: true,
            createdAt: true,
            updatedAt: true,
            professor: {
              select: {
                id: true,
                user: {
                  select: {
                    email: true,
                    name: true,
                  },
                },
              },
            },
            studentFile: {
              select: {
                filename: true,
              },
            },
            professorFile: {
              select: {
                filename: true,
              },
            },
          },
        },
      },
      where: {
        userId: user.id,
      },
    });
    if (!student) {
      throw new HttpException('Student not found', 404);
    }

    return student;
  }
}

export async function getApprovedDissertationRequests(userId) {
  const user = await Prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new HttpException('User not found', 404);
  }

  if (user.role !== UserRole.PROFESSOR) {
    throw new HttpException('User is not a professor', 400);
  }

  const professor = await Prisma.professor.findUnique({
    select: {
      DissertationRequests: {
        select: {
          id: true,
          status: true,
          createdAt: true,
          student: {
            select: {
              id: true,
              user: {
                select: {
                  email: true,
                  name: true,
                },
              },
            },
          },
          professorFile: {
            select: {
              filename: true,
            },
          },
          studentFile: {
            select: {
              filename: true,
            },
          },
        },
      },
    },
    where: {
      userId: user.id,
    },
  });
  if (!professor) {
    throw new HttpException('Professor not found', 404);
  }

  return professor.DissertationRequests.filter(
    (dissertationRequest) =>
      dissertationRequest.status === DissertationRequestStatus.APPROVED ||
      dissertationRequest.status ===
        DissertationRequestStatus.APPROVED_REJECTED ||
      dissertationRequest.status ===
        DissertationRequestStatus.FILE_UPLOADED_BY_STUDENT ||
      dissertationRequest.status ===
        DissertationRequestStatus.FILE_UPLOADED_BY_PROFESSOR
  ).map((dissertationRequest) => ({
    ...dissertationRequest,
    student: dissertationRequest.student,
  }));
}

export async function handlePreliminaryDissertationRequest(
  userId,
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

  const user = await Prisma.user.findUnique({
    select: {
      id: true,
      role: true,
      Professor: true,
    },
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new HttpException('User not found', 404);
  }

  const professor = await Prisma.professor.findUnique({
    where: {
      id: user.Professor.id,
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
    select: {
      DissertationRequests: true,
    },
    where: {
      userId: studentId,
    },
  });

  if (!student) {
    throw new HttpException('Student not found', 404);
  }

  const dissertationRequest = student.DissertationRequests.find(
    (dissertationRequest) => dissertationRequest.id === dissertationRequestId
  );

  if (!dissertationRequest) {
    throw new HttpException('Dissertation request not found', 404);
  }

  if (
    dissertationRequest.status !== DissertationRequestStatus.APPROVED &&
    dissertationRequest.status !== DissertationRequestStatus.APPROVED_REJECTED
  ) {
    throw new HttpException('Dissertation request is not approved', 400);
  }

  if (
    dissertationRequest.status === DissertationRequestStatus.APPROVED_REJECTED
  ) {
    await Prisma.files.delete({
      where: {
        id: dissertationRequest.studentFileId,
      },
    });
  }

  const file = await Prisma.files.create({
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

export async function declineDissertationRequest(
  professorId,
  dissertationRequestId
) {
  const professor = await Prisma.professor.findUnique({
    select: {
      DissertationRequests: true,
    },
    where: {
      userId: professorId,
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
    dissertationRequest.status !==
    DissertationRequestStatus.FILE_UPLOADED_BY_STUDENT
  ) {
    throw new HttpException(
      'Dissertation request cannot be modified in this state',
      400
    );
  }

  return Prisma.dissertationRequests.update({
    where: {
      id: dissertationRequestId,
    },
    data: {
      status: DissertationRequestStatus.APPROVED_REJECTED,
    },
  });
}

export async function uploadApprovedDissertationRequest(
  professorId,
  dissertationRequestId,
  status,
  filename,
  path
) {
  if (status !== DissertationRequestStatus.FILE_UPLOADED_BY_PROFESSOR) {
    throw new HttpException('Invalid status', 400);
  }

  const professor = await Prisma.professor.findUnique({
    select: {
      DissertationRequests: true,
    },
    where: {
      userId: professorId,
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
    dissertationRequest.status !==
    DissertationRequestStatus.FILE_UPLOADED_BY_STUDENT
  ) {
    throw new HttpException(
      'Dissertation request cannot be modified in this state',
      400
    );
  }

  if (!filename && !path) {
    throw new HttpException('File is required', 400);
  }

  let file;

  file = await Prisma.files.create({
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
      professorFileId: file?.id || undefined,
    },
  });
}
