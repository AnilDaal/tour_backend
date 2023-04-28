import multer from "multer";
import fs from "fs";

const multerStorage = multer.diskStorage({
  destination: function (req, file, next) {
    const path = `./uploads/${req.user.Name}`;
    fs.mkdirSync(path, { recursive: true });
    return next(null, path);
  },
  filename: function (req, file, next) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    return next(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});

export const upload = multer({ storage: multerStorage });
