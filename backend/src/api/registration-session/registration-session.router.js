import * as RegistrationSessionsController from './registration-session.controller.js';
import AuthMiddleware from '../../utils/middlewares/auth.middleware.js';
import { CreateRegistrationSessionValidateSchema } from '../../utils/yup-schemas.js';
import { RoleMiddleware } from '../../utils/middlewares/role.middleware.js';
import { UserRole } from '../../utils/constants.js';
import ValidateSchema from '../../utils/middlewares/schema-validate.middleware.js';
import express from 'express';

const RegistrationSessionsRouter = express.Router();

RegistrationSessionsRouter.post(
  '/create-registration-session',
  AuthMiddleware,
  RoleMiddleware(UserRole.PROFESSOR),
  ValidateSchema(CreateRegistrationSessionValidateSchema),
  RegistrationSessionsController.createRegistrationSession
);

export default RegistrationSessionsRouter;
