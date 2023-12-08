import * as ProfessorController from './professor.controller.js';
import AuthMiddleware from '../../utils/middlewares/auth.middleware.js';
import { RoleMiddleware } from '../../utils/middlewares/role.middleware.js';
import { UserRole } from '../../utils/constants.js';
import express from 'express';

const ProfessorRouter = express.Router();

ProfessorRouter.get(
  '/available-professors',
  AuthMiddleware,
  RoleMiddleware(UserRole.STUDENT),
  ProfessorController.getAllAvailableProfessors
);

export default ProfessorRouter;
