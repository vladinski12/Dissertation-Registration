import * as DissertationService from './dissertation.service.js';
import { DissertationRequestStatus } from '../../utils/constants.js';

export async function createDissertationRequest(req, res, next) {
  try {
    const studentId = req.user.id;
    const professorId = req.body.professorId;
    const studentMessage = req.body.studentMessage;
    res
      .status(200)
      .json(
        await DissertationService.createDissertationRequest(
          studentId,
          professorId,
          studentMessage
        )
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

export async function getApprovedDissertationRequests(req, res, next) {
  try {
    const userId = req.user.id;
    res
      .status(200)
      .json(await DissertationService.getApprovedDissertationRequests(userId));
  } catch (err) {
    next(err);
  }
}

export async function handlePreliminaryDissertationRequest(req, res, next) {
  try {
    const userId = req.user.id;
    const dissertationRequestId = Number(req.params.dissertationRequestId);
    const status = req.body.status;
    let declinedReason;
    if (status === DissertationRequestStatus.DECLINED)
      declinedReason = req.body.declinedReason;
    res
      .status(200)
      .json(
        await DissertationService.handlePreliminaryDissertationRequest(
          userId,
          dissertationRequestId,
          status,
          declinedReason
        )
      );
  } catch (err) {
    next(err);
  }
}

export async function uploadDissertationRequest(req, res, next) {
  try {
    const studentId = req.user.id;
    const dissertationRequestId = Number(req.params.dissertationRequestId);
    const { filename, path } = req.file;
    res
      .status(200)
      .json(
        await DissertationService.uploadDissertationRequest(
          studentId,
          dissertationRequestId,
          filename,
          path
        )
      );
  } catch (err) {
    next(err);
  }
}

export async function declineDissertationRequest(req, res, next) {
  try {
    const professorId = req.user.id;
    const dissertationRequestId = Number(req.params.dissertationRequestId);
    res
      .status(200)
      .json(
        await DissertationService.declineDissertationRequest(
          professorId,
          dissertationRequestId
        )
      );
  } catch (err) {
    next(err);
  }
}

export async function uploadApprovedDissertationRequest(req, res, next) {
  try {
    const professorId = req.user.id;
    const dissertationRequestId = Number(req.params.dissertationRequestId);
    const status = req.body.status;
    const { filename, path } = req.file;
    res
      .status(200)
      .json(
        await DissertationService.uploadApprovedDissertationRequest(
          professorId,
          dissertationRequestId,
          status,
          filename,
          path
        )
      );
  } catch (err) {
    next(err);
  }
}
