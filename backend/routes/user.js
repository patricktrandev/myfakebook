const express = require("express");
const {
  registerAccount,
  activateAccount,
  login,
  auth,
  sendVerificationCode,
  generateCodeResetPassword,
  findUser,
  validateResetCode,
  changePassword,
} = require("../controller/user");
const { authUser } = require("../middleware/userAuth");

const router = express.Router();

//register
router.post("/register", registerAccount);
router.post("/activate", authUser, activateAccount);
router.post("/login", login);
router.post("/send", authUser, sendVerificationCode);
router.post("/finduser", findUser);
router.post("/sendResetCodeVerification", generateCodeResetPassword);
router.post("/validatereset", validateResetCode);
router.post("/changepassword", changePassword);
module.exports = router;
