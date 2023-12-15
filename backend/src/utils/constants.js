export const CUSTOM_ERROR_MESSAGES = {
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
};

export const UserRole = {
  PROFESSOR: 'PROFESSOR',
  STUDENT: 'STUDENT',
};

export const UserRoleArray = [UserRole.PROFESSOR, UserRole.STUDENT];

export const DissertationRequestStatus = {
  PENDING_APPROVAL: 'PENDING_APPROVAL',
  APPROVED: 'APPROVED',
  DECLINED: 'DECLINED',
  APPROVED_REJECTED: 'APPROVED_REJECTED',
  FILE_UPLOADED_BY_STUDENT: 'FILE_UPLOADED_BY_STUDENT',
  FILE_UPLOADED_BY_PROFESSOR: 'FILE_UPLOADED_BY_PROFESSOR',
};

export const DissertationRequestStatusArray = [
  DissertationRequestStatus.PENDING_APPROVAL,
  DissertationRequestStatus.APPROVED,
  DissertationRequestStatus.DECLINED,
  DissertationRequestStatus.APPROVED_REJECTED,
  DissertationRequestStatus.FILE_UPLOADED_BY_STUDENT,
  DissertationRequestStatus.FILE_UPLOADED_BY_PROFESSOR,
];

export const MAX_NUMBER_OF_STUDENTS_PER_PROFESSOR = 5;
