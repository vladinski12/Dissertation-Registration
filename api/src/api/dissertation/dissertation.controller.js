import { DissertationRequestStatus } from "../../utils/constants.js";
import * as DissertationService from "./dissertation.service.js";

export async function createDissertationRequest(req, res, next) {
  try {
    const studentId = req.user.id;
    const professorId = req.body.professorId;
    res
      .status(200)
      .json(
        await DissertationService.createDissertationRequest(
          studentId,
          professorId,
        ),
      );
  } catch (err) {
    next(err);
  }
}

export async function getDissertationRequests(req, res, next) {
  try {
    const userId = req.user.id;
    res
      .status(200)
      .json(await DissertationService.getDissertationRequests(userId));
  } catch (err) {
    next(err);
  }
}

export async function handlePreliminaryDissertationRequest(req, res, next) {
  try {
    const professorId = req.user.id;
    const dissertationRequestId = req.params.dissertationRequestId;
    const status = req.body.status;
    let declinedReason;
    if (status === DissertationRequestStatus.DECLINED)
      declinedReason = req.body.declinedReason;
    res
      .status(200)
      .json(
        await DissertationService.handlePreliminaryDissertationRequest(
          professorId,
          dissertationRequestId,
          status,
          declinedReason,
        ),
      );
  } catch (err) {
    next(err);
  }
}

export async function uploadDissertationRequest(req, res, next) {
  try {
    const studentId = req.user.id;
    const dissertationRequestId = req.params.dissertationRequestId;
    const { filename, path } = req.file;
    res
      .status(200)
      .json(
        await DissertationService.uploadDissertationRequest(
          studentId,
          dissertationRequestId,
          filename,
          path,
        ),
      );
  } catch (err) {
    next(err);
  }
}

export async function handleUploadedDissertationRequest(req, res, next) {
  try {
    const professorId = req.user.id;
    const dissertationRequestId = req.params.dissertationRequestId;
    const status = req.body.status;
    let declinedReason;
    if (status === DissertationRequestStatus.APPROVED_REJECTED)
      declinedReason = req.body.declinedReason;
    const { filename, path } = req.file;
    res
      .status(200)
      .json(
        await DissertationService.handleUploadedDissertationRequest(
          professorId,
          dissertationRequestId,
          status,
          declinedReason,
          filename,
          path,
        ),
      );
  } catch (err) {
    next(err);
  }
}
