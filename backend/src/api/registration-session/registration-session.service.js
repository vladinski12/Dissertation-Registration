import HttpException from '../../utils/http-exception.js';
import Prisma from '../../prisma.js';

export async function createRegistrationSession(
  professorId,
  startDate,
  endDate
) {
  if (startDate > endDate) {
    throw new HttpException('Start date must be before end date', 400);
  }

  if (startDate < new Date()) {
    throw new HttpException('Start date must be in the future', 400);
  }

  const professor = await Prisma.professor.findUnique({
    where: {
      id: professorId,
    },
  });

  if (!professor) {
    throw new HttpException('Professor not found', 404);
  }

  const existingSession = await Prisma.registrationSession.findFirst({
    where: {
      professorId,
      startDate: {
        gte: startDate,
      },
      endDate: {
        lte: endDate,
      },
    },
  });

  if (existingSession) {
    throw new HttpException('Session is overlapping with an existing one', 400);
  }

  return Prisma.registrationSession.create({
    data: {
      professor: {
        connect: {
          id: professorId,
        },
      },
      startDate: startDate,
      endDate: endDate,
    },
  });
}
