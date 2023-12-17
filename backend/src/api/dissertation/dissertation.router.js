import * as DissertationController from './dissertation.controller.js';
import {
  CreateDissertationRequestValidateSchema,
  HandleDissertationRequestValidateSchema,
} from '../../utils/yup-schemas.js';
import AuthMiddleware from '../../utils/middlewares/auth.middleware.js';
import { RoleMiddleware } from '../../utils/middlewares/role.middleware.js';
import UploadFile from '../../storage.js';
import { UserRole } from '../../utils/constants.js';
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

DissertationRouter.get(
  '/get-approved-dissertation-requests',
  AuthMiddleware,
  RoleMiddleware([UserRole.PROFESSOR]),
  DissertationController.getApprovedDissertationRequests
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
  UploadFile.single('file'),
  DissertationController.uploadDissertationRequest
);

DissertationRouter.post(
  '/decline-dissertation-request/:dissertationRequestId',
  AuthMiddleware,
  RoleMiddleware([UserRole.PROFESSOR]),
  ValidateSchema(HandleDissertationRequestValidateSchema),
  DissertationController.declineDissertationRequest
);

DissertationRouter.post(
  '/upload-approved-dissertation-request/:dissertationRequestId',
  AuthMiddleware,
  RoleMiddleware([UserRole.PROFESSOR]),
  UploadFile.single('file'),
  ValidateSchema(HandleDissertationRequestValidateSchema),
  DissertationController.uploadApprovedDissertationRequest
);

export default DissertationRouter;
