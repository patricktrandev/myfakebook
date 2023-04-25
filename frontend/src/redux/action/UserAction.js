import axios from "axios";
import {
  CLEAR_ERROR,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "../constant/userConstant";

export const registerAction = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_REQUEST,
    });
    console.log(userData);
    console.log("register call");
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/register",
      userData
    );
    dispatch({
      type: REGISTER_SUCCESS,
      payload: data,
    });
    console.log("gett data", data);
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response?.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
