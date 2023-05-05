const express = require("express");
const { authUser } = require("../middleware/userAuth");
const { createPost } = require("../controller/post");

const router = express.Router();

//register
router.post("/createPost", authUser, createPost);

module.exports = router;
