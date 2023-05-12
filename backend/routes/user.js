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
  getProfile,
  updateProfilePicture,
  updateCover,
  updateDetails,
  addFriend,
  cancelRequest,
  follow,
  unfollow,
  acceptRequest,
  unfriend,
  deleteRequest,
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
router.get("/getProfile/:username", authUser, getProfile);
router.put("/updateProfilePicture", authUser, updateProfilePicture);
router.put("/updateCover", authUser, updateCover);
router.put("/updateDetails", authUser, updateDetails);

//friends
router.put("/addFriend/:id", authUser, addFriend);
router.put("/cancelRequest/:id", authUser, cancelRequest);
router.put("/follow/:id", authUser, follow);
router.put("/unfollow/:id", authUser, unfollow);
router.put("/acceptRequest/:id", authUser, acceptRequest);
router.put("/unfriend/:id", authUser, unfriend);
router.put("/deleteRequest/:id", authUser, deleteRequest);

module.exports = router;
