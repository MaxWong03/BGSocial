import { createContext, useContext, useState } from "react";

// useContext(sessionContext) obtains the current value stored in the sessionContext: { userInfo, setUserInfo }
const sessionContext = createContext('session');

const initializeUserinfoState = () => {
  const [userInfo, setUserInfo] = useState({
    id: undefined,
    facebookId: undefined,
    profilePicture: undefined
  });
  return [sessionContext, { userInfo, setUserInfo }];
};

const getUserInfo = () => useContext(sessionContext).userInfo;
const getUserInfoContext = () => useContext(sessionContext);

const logout = () => setUserInfo({});
  
export {
  getUserInfo,
  getUserInfoContext,
  initializeUserinfoState,
  logout
};