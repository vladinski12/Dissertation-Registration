import express from 'express';
import AuthRouter from '../src/api/auth/auth.router.js';
import StudentRouter from '../src/api/student/student.router.js';
import ProfessorRouter from '../src/api/professor/professor.router.js';
import DissertationRouter from '../src/api/dissertation/dissertation.router.js';
import RegistrationSessionsRouter from '../src/api/registration-session/registration-session.router.js';

const Router = express.Router();

Router.use('/auth', AuthRouter);

Router.use('/student', StudentRouter);

Router.use('/professor', ProfessorRouter);

Router.use('/dissertation', DissertationRouter);

Router.use('/registration-session', RegistrationSessionsRouter);

export default Router;
