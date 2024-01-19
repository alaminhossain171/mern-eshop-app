
import { jwtDecode } from "jwt-decode";
import { login, user } from "../../config/restAPI";
import { apiGet, apiPost, getItem, removeItem, setItem } from "../../utils/utils";  
export const SET_CURRENT_USER = "set_current_user";
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import "core-js/stable/atob";
export const loginAction = async (user, dispatch) => {
  try {
    const res = await apiPost(login, user);

    if (res && res.token) {
      const token = res.token;
      await setItem('jwt',token);
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded, user));
    } else {
      logoutUser(dispatch);
    }
  } catch (error) {
    console.log('error', error);
    Toast.show({
      topOffset: 60,
      type: "error",
      text1: error.message || "Something went wrong",
      text2: "Invalid Credentials",
    });
    logoutUser(dispatch);
  }
};
export const getUserProfile = async (id) => {
  try {
    const res = await apiGet(`${user}/${id}`);
    console.log("user is ", res);
  } catch (error) {
    console.log("user api", error);
  }
};

export const logoutUser = async (dispatch) => { 
  await removeItem('jwt');  
  dispatch(setCurrentUser({}));
};

export const setCurrentUser = (decoded, user) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
    userProfile: user,
  };
};
