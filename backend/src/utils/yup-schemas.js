import {
  DissertationRequestStatus,
  DissertationRequestStatusArray,
  UserRoleArray,
} from './constants.js';
import { date, number, object, string } from 'yup';

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
  studentMessage: string().min(10).max(255).required(),
});

const HandleDissertationRequestValidateSchema = object({
  status: string().max(255).required().oneOf(DissertationRequestStatusArray),
  declinedReason: string()
    .min(10)
    .max(255)
    .when('status', {
      is: DissertationRequestStatus.DECLINED,
      then: () => string().required(),
    }),
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
