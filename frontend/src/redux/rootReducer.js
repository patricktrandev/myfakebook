import userReducer from "./reducer/UserReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
