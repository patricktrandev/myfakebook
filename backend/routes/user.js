const express = require("express");
const getUser = require("../controller/user");
const router = express.Router();
router.get("/user", getUser.userPg);
router.get("/us", getUser.userPg2);
module.exports = router;
