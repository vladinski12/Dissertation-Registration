import { UserRole, DissertationRequestStatus } from './constants.js';

export function isValidString(value, minLength, maxLength) {
  return (
    typeof value === 'string' &&
    value.trim() !== '' &&
    value.length >= minLength &&
    value.length <= maxLength
  );
}

export function isValidPassword(password) {
  return isValidString(password, 8, 255);
}

export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return isValidString(email, 5, 255) && emailRegex.test(email);
}

export function isValidUserRole(userRole) {
  return userRole === UserRole.PROFESSOR || userRole === UserRole.STUDENT;
}

export function isValidDissertationRequestStatus(status) {
  return (
    status === DissertationRequestStatus.APPROVED ||
    status === DissertationRequestStatus.DECLINED ||
    status === DissertationRequestStatus.PENDING_APPROVAL ||
    status === DissertationRequestStatus.APPROVED_REJECTED ||
    status === DissertationRequestStatus.FILE_UPLOADED_BY_STUDENT ||
    status === DissertationRequestStatus.FILE_UPLOADED_BY_PROFESSOR
  );
}

export function isValidFile(file, types, size) {
  return (
    file?.mimetype &&
    types.includes(file.mimetype) &&
    file?.size &&
    file.size <= size
  );
}

export function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}
