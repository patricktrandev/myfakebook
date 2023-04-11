const express = require("express");
const {
  registerAccount,
  activateAccount,
  login,
} = require("../controller/user");
const router = express.Router();

//register
router.post("/register", registerAccount);
router.post("/activate", activateAccount);
router.post("/login", login);
module.exports = router;
