const User = require("../model/users");
const validateEmail = (email) => {
  let reg = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/;
  return String(email).toLowerCase().match(reg);
};
const validateLength = (text, min, max) => {
  if (text.length > max || text.length < min) {
    return false;
  }
  return true;
};

const validateUserName = async (username) => {
  let valid = false;
  do {
    let check = await User.findOne({ username });
    if (check) {
      username = `${username}${(new Date() * Math.random())
        .toString()
        .substring(0, 3)}`;
      valid = true;
    } else {
      valid = false;
    }
  } while (valid);

  return username;
};
module.exports = {
  validateEmail,
  validateLength,
  validateUserName,
};
