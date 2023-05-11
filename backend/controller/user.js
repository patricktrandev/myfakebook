const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/users");
const Post = require("../model/Post");

const {
  validateEmail,
  validateLength,
  validateUserName,
} = require("../helpers/validation");
const { generateToken } = require("../helpers/tokens");
const {
  sendVerificationEmail,
  sendVerificationCodeReset,
} = require("../helpers/mailer");
const Code = require("../model/Code");
const { generateRandomCode } = require("../helpers/otpHelper");
const catchAsyncError = require("../helpers/catchAsyncError");
const registerAccount = catchAsyncError(async (req, res, next) => {
  try {
    //validate email
    let {
      email,
      first_name,
      last_name,
      password,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    if (!validateEmail(email)) {
      res.status(404).json({
        message: "Invalid email",
      });
    }
    const check = await User.findOne({ email });
    if (check) {
      res.status(400).json({
        message: "Email already existed. Please try with other email",
      });
    }
    if (!validateLength(first_name, 3, 30)) {
      res.status(400).json({
        message: "First name must be between 3 and 30 characters",
      });
    }

    if (!validateLength(last_name, 3, 30)) {
      res.status(400).json({
        message: "Last name must be between 3 and 30 characters",
      });
    }

    if (!validateLength(password, 6, 60)) {
      res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }
    //encrypt password
    const cryptedPassword = await bcrypt.hash(password, 15);

    //create username
    username = first_name + last_name;
    let newUsername = await validateUserName(username);

    const newUser = {
      first_name,
      last_name,
      username: newUsername,
      email,
      password: cryptedPassword,
      bYear,
      bMonth,
      bDay,
      gender,
    };
    //save user
    const user = await new User(newUser).save();

    //verify email
    const emailVerifiedToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );
    //send email
    const url = `${process.env.BASE_URL}/activate/${emailVerifiedToken}`;
    sendVerificationEmail(user.email, user.first_name, url);
    const token = generateToken({ id: user._id.toString() }, "3d");

    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Successfully register! Please activate your email to start",
    });
  } catch (err) {
    res.status(500).json({
      message: `${err.message}`,
    });
  }
});

const activateAccount = catchAsyncError(async (req, res, next) => {
  try {
    const validUser = req.user.id;

    const { token } = req.body;
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    const check = await User.findById(user.id);
    //console.log(user);
    if (validUser !== user.id) {
      res.status(400).json({
        message:
          "Invalid credentials. You don't have the authorization to complete this operation.",
      });
    }

    if (check.verified) {
      res.status(400).json({ message: "Email is already activated" });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: "true" });
      res.status(200).json({
        message: "Account has been activated successfully",
      });
    }
  } catch (err) {
    res.status(500).json({ message: `${err.message}` });
  }
});

const login = catchAsyncError(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email: email });
    if (!userFound) {
      res
        .status(400)
        .json({ message: "Email address is not connected to an account" });
    }
    const check = await bcrypt.compare(password, userFound.password);
    if (check) {
      const token = generateToken({ id: userFound._id.toString() }, "7d");
      res.send({
        id: userFound._id,
        username: userFound.username,
        picture: userFound.picture,
        first_name: userFound.first_name,
        last_name: userFound.last_name,
        token: token,
        verified: userFound.verified,
        message: "Successfully Login!",
      });
    } else {
      res
        .status(500)
        .json({ message: "Invalid credentials. Please try again" });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

const auth = async (req, res, next) => {
  try {
    let userId = req.user.id;

    res.json(userId);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  console.log("Welcome auth");
};

const sendVerificationCode = catchAsyncError(async (req, res, next) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    if (user.verified === true) {
      res.status(400).json({
        message: "This account is already activated.",
      });
    }
    const emailVerifiedToken = generateToken({ id: user._id.toString() }, "1d");
    const url = `${process.env.BASE_URL}/activate/${emailVerifiedToken}`;
    sendVerificationEmail(user.email, user.first_name, url);
    res.status(200).json({
      message: "Verification email sent. Please check your message inbox.",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

const findUser = catchAsyncError(async (req, res, next) => {
  try {
    const { email } = req.body;
    const userFound = await User.findOne({ email }).select("-password");
    //console.log(userFound);
    if (!userFound) {
      res.status(400).json({
        message: "This account does not exist.",
      });
    }
    res.status(200).json({
      email: userFound.email,
      picture: userFound.picture,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
const generateCodeResetPassword = catchAsyncError(async (req, res, next) => {
  try {
    const { email } = req.body;
    const userFound = await User.findOne({ email }).select("-password");

    await Code.findOneAndRemove({ user: userFound._id });
    const code = generateRandomCode(5);
    console.log(code);
    const savedCode = await new Code({
      code,
      user: userFound._id,
    }).save();
    sendVerificationCodeReset(userFound.email, userFound.first_name, code);

    res.status(200).json({
      message: "Email reset code has been sent to you email.",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
const validateResetCode = catchAsyncError(async (req, res, next) => {
  try {
    const { email, code } = req.body;
    const userFound = await User.findOne({ email });
    console.log("----" + userFound._id);
    const codeFound = await Code.findOne({ user: userFound._id });
    if (codeFound.code != code) {
      return res.status(400).json({
        message: "Invalid verification code.",
      });
    }
    res.status(200).json({
      message: "Operation is complete.",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});
const changePassword = catchAsyncError(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const cryptedPassword = await bcrypt.hash(password, 15);
    await User.findOneAndUpdate({ email }, { password: cryptedPassword });
    return res.status(200).json({
      message: "ok",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

//*******************PROFILE ****************************//
const getProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const profile = await User.findOne({ username }).select("-password");
    //res.json(profile);
    if (!profile) {
      return res.json({ ok: false });
    }

    const posts = await Post.find({ user: profile._id }).populate("user");
    res.json({ ...profile.toObject(), posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerAccount,
  activateAccount,
  login,
  auth,
  sendVerificationCode,
  findUser,
  generateCodeResetPassword,
  validateResetCode,
  changePassword,
  getProfile,
};
