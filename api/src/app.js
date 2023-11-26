import path from 'path';
import express from 'express';
import morgan from 'morgan';
import { PORT } from './utils/env.js';
import Router from './router.js';
import HttpException from '../src/utils/http-exception.js';
import ErrorMiddleware from './utils/middlewares/error.middleware.js';

//* INITIALIZATIONS
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

//* ROUTES
app.use('/api', Router);

app.get('/', (_req, res) => {
  res.send('SUCCESS');
});

//* HANDLING ERRORS
app.use(() => {
  throw new HttpException('Not found', 404);
});

app.use(ErrorMiddleware);

//* STARTING THE SERVER
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
