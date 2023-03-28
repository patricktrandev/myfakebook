const express = require("express");
const getUser = require("../controller/user");
const router = express.Router();

//register
router.post("/register", getUser.registerAccount);

module.exports = router;
