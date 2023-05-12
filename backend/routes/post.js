const express = require("express");
const { authUser } = require("../middleware/userAuth");
const { createPost, getAllPosts } = require("../controller/post");
const { reactPost, getReacts } = require("../controller/react");

const router = express.Router();

//register
router.post("/createPost", authUser, createPost);
router.get("/getAllPosts", authUser, getAllPosts);

//react post
router.put("/reactPost", authUser, reactPost);
router.get("/getReacts/:id", authUser, getReacts);

module.exports = router;
