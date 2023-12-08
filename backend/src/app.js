import ErrorMiddleware from './utils/middlewares/error.middleware.js';
import HttpException from '../src/utils/http-exception.js';
import { PORT } from './utils/env.js';
import Router from './router.js';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';

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
  console.log('Press Ctrl+C to quit.');
});
