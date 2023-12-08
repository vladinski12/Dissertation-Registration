import * as AuthController from './auth.controller.js';
import {
  LoginValidateSchema,
  RegisterValidateSchema,
} from '../../utils/yup-schemas.js';
import AuthMiddleware from '../../utils/middlewares/auth.middleware.js';
import ValidateSchema from '../../utils/middlewares/schema-validate.middleware.js';
import express from 'express';

const AuthRouter = express.Router();

AuthRouter.post(
  '/login',
  ValidateSchema(LoginValidateSchema),
  AuthController.login
);

AuthRouter.post(
  '/register',
  ValidateSchema(RegisterValidateSchema),
  AuthController.register
);

AuthRouter.get('/my-profile', AuthMiddleware, AuthController.getMyProfile);

export default AuthRouter;
