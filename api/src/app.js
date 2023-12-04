import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { PORT } from './utils/env.js';
import Router from './router.js';
import HttpException from '../src/utils/http-exception.js';
import ErrorMiddleware from './utils/middlewares/error.middleware.js';
import swaggerUi from 'swagger-ui-express';
import swaggerAutogen from 'swagger-autogen';
import { readFileSync } from 'fs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const swaggerDocument = JSON.parse(
  readFileSync(path.join(__dirname, 'swagger.json'), 'utf8')
);

//* INITIALIZATIONS
const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
swaggerAutogen()(
  path.join(__dirname, 'swagger.json'),
  [path.join(__dirname, 'router.js')],
  {
    info: {
      title: 'Dissertation Registration API',
      description: 'API for the dissertation registration system',
    },
    host: 'localhost:3000',
  }
);

//* ROUTES
app.use('/api', Router);

app.get('/', (_req, res) => {
  res.send('API is running...');
});

app.get('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//* HANDLING ERRORS
app.use(() => {
  throw new HttpException('Not found', 404);
});

app.use(ErrorMiddleware);

//* STARTING THE SERVER
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
