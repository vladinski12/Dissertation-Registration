import { object, string, number, date } from 'yup';
import { DissertationRequestStatusArray, UserRoleArray } from './constants.js';

const LoginValidateSchema = object({
  email: string().max(255).email().required(),
  password: string().max(255).required(),
});

const RegisterValidateSchema = object({
  email: string().max(255).email().required(),
  password: string().max(255).required(),
  name: string().max(255).required(),
  userRole: string().max(255).required().oneOf(UserRoleArray),
});

const CreateDissertationRequestValidateSchema = object({
  professorId: number().required(),
});

const HandleDissertationRequestValidateSchema = object({
  status: string().max(255).required().oneOf(DissertationRequestStatusArray),
  declinedReason: string().max(255).required(),
});

const CreateRegistrationSessionValidateSchema = object({
  startDate: date().required(),
  endDate: date().required(),
});

export {
  LoginValidateSchema,
  RegisterValidateSchema,
  CreateDissertationRequestValidateSchema,
  HandleDissertationRequestValidateSchema,
  CreateRegistrationSessionValidateSchema,
};
