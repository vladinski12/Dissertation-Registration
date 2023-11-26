import express from 'express';
import * as AuthController from './auth.controller.js';
import LoginValidate from './validators/login.validate.js';
import RegisterValidate from './validators/register.validate.js';

const AuthRouter = express.Router();

AuthRouter.post('/login', LoginValidate, AuthController.login);

AuthRouter.post('/register', RegisterValidate, AuthController.register);

export default AuthRouter;
