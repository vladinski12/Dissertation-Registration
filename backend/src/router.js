import AuthRouter from '../src/api/auth/auth.router.js';
import DissertationRouter from '../src/api/dissertation/dissertation.router.js';
import ProfessorRouter from '../src/api/professor/professor.router.js';
import RegistrationSessionsRouter from '../src/api/registration-session/registration-session.router.js';
import StudentRouter from '../src/api/student/student.router.js';
import express from 'express';

const Router = express.Router();

Router.use('/auth', AuthRouter);

Router.use('/dissertation', DissertationRouter);

Router.use('/professor', ProfessorRouter);

Router.use('/registration-session', RegistrationSessionsRouter);

Router.use('/student', StudentRouter);

export default Router;
