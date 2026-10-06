const express = require("express");
const multer = require("multer");
const { analyzeResumeController } = require("../controllers/resumeController");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * @route   POST /analyze or POST /
 * @desc    Upload resume PDF and perform AI evaluation & job matching
 * @access  Public
 */
router.post("/analyze", upload.single("resume"), analyzeResumeController);
router.post("/", upload.single("resume"), analyzeResumeController);

module.exports = router;
