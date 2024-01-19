// Auth.js
import React, { useEffect, useReducer, useState } from "react";
import AuthReducer from "../reducers/AuthReducer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
import AuthGlobal from "./AuthGlobal";
import { setCurrentUser } from "../actions/authAction";
import "core-js/stable/atob";
import { getItem } from "../../utils/utils";
const Auth = (props) => {
  const [stateUser, dispatch] = useReducer(AuthReducer, {
    isAuthenticated: null,
    user: {},
  });
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
getItem('jwt')
.then((token)=>{
  const decode=jwtDecode(token);
  dispatch(setCurrentUser(decode));
})
.catch((error)=>console.log(error))
    // if (AsyncStorage.jwt) {
      
    //     const decoded = AsyncStorage.jwt ? AsyncStorage.jwt : "";
    //     if (setShowChild) {
    //         dispatch(setCurrentUser(jwtDecode(decoded)))
    //     }
    // }
    return () => setShowChild(false);
}, [])

  if (!showChild) {
    return null;
  } else {
    return (
      <AuthGlobal.Provider
        value={{
          stateUser,
          dispatch,
        }}
      >
        {props.children}
      </AuthGlobal.Provider>
    );
  }
};

export default Auth;
