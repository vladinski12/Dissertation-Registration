import { isValidFile } from '../validators.js';

const ValidateFile = (size, supportedTypes) => (req, res, next) => {
  const { file } = req;
  if (!file) {
    return res.status(400).json({ message: 'File is required' });
  }
  if (!isValidFile(file, supportedTypes, size)) {
    return res
      .status(400)
      .json({
        message: `Invalid file. Formats accepted: ${supportedTypes.join(' ')}`,
      });
  }
  next();
};

export default ValidateFile;
