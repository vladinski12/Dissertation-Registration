import Prisma from '../../prisma.js';
import {
  DissertationRequestStatus,
  MAX_NUMBER_OF_STUDENTS_PER_PROFESSOR,
} from '../../utils/constants.js';

export async function getAllAvailableProfessors() {
  const professors = await Prisma.professor.findMany({
    select: {
      id: true,
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
  });
  const filteredProfessors = professors
    .filter(
      (professor) =>
        professor.RegistrationSessions.length > 0 &&
        professor.RegistrationSessions.some(
          (session) => session.endDate > new Date(),
        ),
    )
    .map((professor) => {
      const numberOfStudents = professor.DissertationRequests.filter(
        (request) => request.status === DissertationRequestStatus.APPROVED,
      ).length;
      delete professor.DissertationRequests;
      return {
        ...professor,
        numberOfStudents,
        isFull: numberOfStudents >= MAX_NUMBER_OF_STUDENTS_PER_PROFESSOR,
      };
    });

  return filteredProfessors;
}
