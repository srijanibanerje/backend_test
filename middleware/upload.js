import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error("Only JPEG, PNG, or PDF files are allowed"), false);
    }
    cb(null, true);
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 6 * 1024 * 1024 }, // 1MB limit
});

export default upload;