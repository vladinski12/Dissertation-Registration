import {
  isValidString,
  isValidDissertationRequestStatus,
  isValidFile,
} from '../../../utils/validators.js';

import {
  DissertationRequestStatus,
  ONE_MEGABYTE,
} from '../../../utils/constants.js';

const HandleDissertationRequestValidate =
  (isStudent = false, validateFile = false) =>
  (req, res, next) => {
    const { status, declinedReason } = req.body;
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }
    if (
      !isValidString(status, 5, 255) ||
      !isValidDissertationRequestStatus(status)
    ) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    if (
      isStudent &&
      status !== DissertationRequestStatus.FILE_UPLOADED_BY_STUDENT
    ) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    if (
      status === DissertationRequestStatus.DECLINED ||
      status === DissertationRequestStatus.APPROVED_REJECTED
    ) {
      if (!declinedReason)
        return res.status(400).json({ message: 'Declined reason is required' });
      if (!isValidString(declinedReason, 5, 255)) {
        return res.status(400).json({ message: 'Invalid declined reason' });
      }
    }

    if (validateFile) {
      const { file } = req;
      if (!file) {
        return res.status(400).json({ message: 'File is required' });
      }
      if (!isValidFile(file, ['application/pdf'], 5 * ONE_MEGABYTE)) {
        return res
          .status(400)
          .json({ message: 'Invalid file. Format accepted application/pdf' });
      }
    }
    next();
  };

export default HandleDissertationRequestValidate;
