const express = require("express");
const { authUser } = require("../middleware/userAuth");
const imageUpload = require("../middleware/imageUpload");
const { uploadImgae } = require("../controller/imageUpload");

const router = express.Router();

//register
router.post("/uploadImages", authUser, imageUpload, uploadImgae);

module.exports = router;
