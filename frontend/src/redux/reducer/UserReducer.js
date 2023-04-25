import Cookies from "js-cookie";

const { LOGIN } = require("../constant/userConstant");

let initState = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;

const userReducer = (state = initState, action) => {
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
