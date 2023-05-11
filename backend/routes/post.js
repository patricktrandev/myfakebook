const express = require("express");
const { authUser } = require("../middleware/userAuth");
const { createPost, getAllPosts } = require("../controller/post");

const router = express.Router();

//register
router.post("/createPost", authUser, createPost);
router.get("/getAllPosts", authUser, getAllPosts);
module.exports = router;
