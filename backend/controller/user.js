const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/users");

const {
  validateEmail,
  validateLength,
  validateUserName,
} = require("../helpers/validation");
const { generateToken } = require("../helpers/tokens");
const { sendVerificationEmail } = require("../helpers/mailer");
const registerAccount = async (req, res) => {
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
      return res.status(404).json({
        message: "Invalid email",
      });
    }
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message: "Email already existed. Please try with other email",
      });
    }
    if (!validateLength(first_name, 3, 30)) {
      return res.status(400).json({
        message: "First name must be between 3 and 30 characters",
      });
    }

    if (!validateLength(last_name, 3, 30)) {
      return res.status(400).json({
        message: "Last name must be between 3 and 30 characters",
      });
    }

    if (!validateLength(password, 6, 60)) {
      return res.status(400).json({
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
      message: err.message,
    });
  }
};

const activateAccount = async (req, res) => {
  try {
    const validUser = req.user.id;

    const { token } = req.body;
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    const check = await User.findById(user.id);
    //console.log(user);
    if (validUser !== user.id) {
      return res.status(400).json({
        message:
          "Invalid credentials. You don't have the authorization to complete this operation.",
      });
    }

    if (check.verified) {
      return res.status(400).json({ message: "Email is already activated" });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: "true" });
      return res.status(200).json({
        message: "Account has been activated successfully",
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email: email });
    if (!userFound) {
      return res
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
    res.status(500).json({ message: err.message });
  }
};

const auth = async (req, res) => {
  try {
    let userId = req.user.id;

    res.json(userId);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  console.log("Welcome auth");
};

const sendVerificationCode = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    if (user.verified === true) {
      return res.status(400).json({
        message: "This account is already activated.",
      });
    }
    const emailVerifiedToken = generateToken({ id: user._id.toString() }, "1d");
    const url = `${process.env.BASE_URL}/activate/${emailVerifiedToken}`;
    sendVerificationEmail(user.email, user.first_name, url);
    return res.status(200).json({
      message: "Verification email sent. Please check your message inbox.",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  registerAccount,
  activateAccount,
  login,
  auth,
  sendVerificationCode,
};
