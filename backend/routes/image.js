const express = require("express");
const { authUser } = require("../middleware/userAuth");
const imageUpload = require("../middleware/imageUpload");
const { uploadImgae, listImages } = require("../controller/imageUpload");

const router = express.Router();

//register
router.post("/uploadImages", authUser, imageUpload, uploadImgae);
router.get("/listImages", listImages);
module.exports = router;
