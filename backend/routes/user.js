const express = require("express");
const {
  registerAccount,
  activateAccount,
  login,
  auth,
  sendVerificationCode,
} = require("../controller/user");
const { authUser } = require("../middleware/userAuth");

const router = express.Router();

//register
router.post("/register", registerAccount);
router.post("/activate", authUser, activateAccount);
router.post("/login", login);
router.post("/send", authUser, sendVerificationCode);
module.exports = router;
