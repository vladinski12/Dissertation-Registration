import * as DissertationController from './dissertation.controller.js';
import {
  CreateDissertationRequestValidateSchema,
  HandleDissertationRequestValidateSchema,
} from '../../utils/yup-schemas.js';
import AuthMiddleware from '../../utils/middlewares/auth.middleware.js';
import { MAX_FILE_SIZE } from '../../utils/env.js';
import { RoleMiddleware } from '../../utils/middlewares/role.middleware.js';
import UploadFile from '../../storage.js';
import { UserRole } from '../../utils/constants.js';
import ValidateFile from '../../utils/middlewares/file-validate.middleware.js';
import ValidateSchema from '../../utils/middlewares/schema-validate.middleware.js';
import express from 'express';

const DissertationRouter = express.Router();

DissertationRouter.post(
  '/create-dissertation-request',
  AuthMiddleware,
  RoleMiddleware([UserRole.STUDENT]),
  ValidateSchema(CreateDissertationRequestValidateSchema),
  DissertationController.createDissertationRequest
);

DissertationRouter.get(
  '/get-dissertation-requests',
  AuthMiddleware,
  RoleMiddleware([UserRole.PROFESSOR, UserRole.STUDENT]),
  DissertationController.getDissertationRequests
);

DissertationRouter.post(
  '/handle-preliminary-dissertation-request/:dissertationRequestId',
  AuthMiddleware,
  RoleMiddleware([UserRole.PROFESSOR]),
  ValidateSchema(HandleDissertationRequestValidateSchema),
  DissertationController.handlePreliminaryDissertationRequest
);

DissertationRouter.post(
  '/upload-dissertation-request/:dissertationRequestId',
  AuthMiddleware,
  RoleMiddleware([UserRole.STUDENT]),
  ValidateFile(10, ['application/pdf']),
  UploadFile.single('file'),
  DissertationController.uploadDissertationRequest
);

DissertationRouter.post(
  '/handle-uploaded-dissertation-request/:dissertationRequestId',
  AuthMiddleware,
  RoleMiddleware([UserRole.PROFESSOR]),
  ValidateSchema(HandleDissertationRequestValidateSchema),
  ValidateFile(MAX_FILE_SIZE, ['application/pdf']),
  UploadFile.single('file'),
  DissertationController.handleUploadedDissertationRequest
);

export default DissertationRouter;
