import { MAX_FILE_SIZE } from './utils/env.js';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function (_req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});
const UploadFile = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: function (_req, file, cb) {
    const fileTypes = /pdf/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      return cb(new Error('File type not supported'));
    }
  },
});

export default UploadFile;
