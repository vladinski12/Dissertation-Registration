import Prisma from '../../prisma.js';
import {
  DissertationRequestStatus,
  MAX_NUMBER_OF_STUDENTS_PER_PROFESSOR,
} from '../../utils/constants.js';

export async function getAllAvailableProfessors() {
  return Prisma.professor
    .findMany({
      select: {
        id: true,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        RegistrationSessions: {
          select: {
            id: true,
            startDate: true,
            endDate: true,
          },
        },
        DissertationRequests: {
          select: {
            id: true,
            status: true,
          },
        },
      },
    })
    .filter(
      (professor) =>
        professor.RegistrationSessions.length > 0 &&
        professor.RegistrationSessions.any(
          (session) => session.endDate > new Date(),
        ),
    )
    .map((professor) => {
      const numberOfStudents = professor.DissertationRequests.filter(
        (request) => request.status === DissertationRequestStatus.APPROVED,
      ).length;
      return {
        ...professor,
        numberOfStudents,
        isFull: numberOfStudents >= MAX_NUMBER_OF_STUDENTS_PER_PROFESSOR,
      };
    });
}
