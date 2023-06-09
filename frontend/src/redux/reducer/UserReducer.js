import Cookies from "js-cookie";

const { LOGIN } = require("../constant/userConstant");

let initState = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case "LOGOUT":
      return null;
    case "UPDATE_PICTURE":
      return { ...state, picture: action.payload };
    case "VERIFY":
      return { ...state, verified: action.payload };
    default:
      return state;
  }
};

export default userReducer;
