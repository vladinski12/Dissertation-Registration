import path from 'path';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import Router from './router.js';
import initalizeSwagger from './swagger.js';
import HttpException from '../src/utils/http-exception.js';
import ErrorMiddleware from './utils/middlewares/error.middleware.js';
import { PORT } from './utils/env.js';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

//* INITIALIZATIONS
const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//* ROUTES
app.use('/api', Router);

initalizeSwagger(__dirname, app);

app.get('/', (_req, res) => {
  res.send('API is running...');
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
