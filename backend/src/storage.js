import path from 'path';
import multer from 'multer';
import { MAX_FILE_SIZE } from './utils/env.js';

const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function (_req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname),
    );
  },
});
const UploadFile = multer({ storage, limits: { fileSize: MAX_FILE_SIZE } });

export default UploadFile;
