import express from "express";
import * as RegistrationSessionsController from "./registration-session.controller.js";
import AuthMiddleware from "../../utils/middlewares/auth.middleware.js";
import { RoleMiddleware } from "../../utils/middlewares/role.middleware.js";
import { UserRole } from "../../utils/constants.js";

const RegistrationSessionsRouter = express.Router();

RegistrationSessionsRouter.post(
  "/create-registration-session",
  AuthMiddleware,
  RoleMiddleware(UserRole.PROFESSOR),
  RegistrationSessionsController.createRegistrationSession,
);

export default RegistrationSessionsRouter;
