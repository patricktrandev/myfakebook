const jwt = require("jsonwebtoken");
const authUser = (req, res, next) => {
  try {
    let tmp = req.header("Authorization");
    let token = tmp ? tmp.slice(7, tmp.length) : "";
    if (!token) {
      return res.status(400).json({ message: "Invalid Authentication" });
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(400).json({ message: "Invalid Authentication" });
      }
      req.user = user;
    });
    console.log("next auth user");
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  authUser,
};
