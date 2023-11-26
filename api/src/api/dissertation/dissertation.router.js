import express from "express";
import * as DissertationController from "./dissertation.controller.js";
import AuthMiddleware from "../../utils/middlewares/auth.middleware.js";
import { RoleMiddleware } from "../../utils/middlewares/role.middleware.js";
import { UserRole } from "../../utils/constants.js";
import CreateDissertationRequestValidate from "./validators/create-dissertation-request.validate.js";
import HandleDissertationRequestValidate from "./validators/handle-dissertation-request.validate.js";
import UploadFile from "../../storage.js";

const DissertationRouter = express.Router();

DissertationRouter.get(
  "/create-dissertation-request",
  AuthMiddleware,
  RoleMiddleware(UserRole.STUDENT),
  CreateDissertationRequestValidate,
  DissertationController.createDissertationRequest,
);

DissertationController.get(
  "/get-dissertation-requests",
  AuthMiddleware,
  RoleMiddleware([UserRole.PROFESSOR, UserRole.STUDENT]),
  DissertationController.getDissertationRequests,
);

DissertationRouter.post(
  "/handle-preliminary-dissertation-request/:dissertationRequestId",
  AuthMiddleware,
  RoleMiddleware(UserRole.PROFESSOR),
  HandleDissertationRequestValidate,
  DissertationController.handlePreliminaryDissertationRequest,
);

DissertationRouter.post(
  "/upload-dissertation-request/:dissertationRequestId",
  AuthMiddleware,
  RoleMiddleware(UserRole.STUDENT),
  HandleDissertationRequestValidate(true, true),
  UploadFile.single("file"),
  DissertationController.uploadDissertationRequest,
);

DissertationRouter.post(
  "/handle-uploaded-dissertation-request/:dissertationRequestId",
  AuthMiddleware,
  RoleMiddleware(UserRole.PROFESSOR),
  HandleDissertationRequestValidate(true),
  UploadFile.single("file"),
  DissertationController.handleUploadedDissertationRequest,
);

export default DissertationRouter;
