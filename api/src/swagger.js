import path from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerAutogen from 'swagger-autogen';
import { readFileSync } from 'fs';

const swaggerDocument = JSON.parse(
  readFileSync(path.join(__dirname, 'swagger.json'), 'utf8')
);

const initializeSwagger = (__dirname, app) => {
  swaggerAutogen()(
    path.join(__dirname, 'swagger.json'),
    [
      path.join(__dirname, 'router.js'),
      path.join(__dirname, 'api', '**', '*.router.js'),
    ],
    {
      info: {
        title: 'Dissertation Registration API',
        description: 'API for the dissertation registration system',
      },
      host: 'localhost:3000',
    }
  );
  app.get('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export default initializeSwagger;
