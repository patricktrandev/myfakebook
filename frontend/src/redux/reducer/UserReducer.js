const { LOGIN } = require("../constant/userConstant");

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    default:
      return state;
  }
};

module.exports = {
  userReducer,
};
