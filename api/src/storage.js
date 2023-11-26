import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: function (_req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname),
    );
  },
});
const UploadFile = multer({ storage, limits: { fileSize: 1000000 } });

export default UploadFile;
