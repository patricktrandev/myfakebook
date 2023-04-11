import { combineReducers } from "redux";
import { userReducer } from "./reducer/UserReducer";
const rootReducer = combineReducers({
  userReducer,
});

export default rootReducer;
