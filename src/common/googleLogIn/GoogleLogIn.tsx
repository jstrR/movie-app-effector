import React from "react";
import { GoogleLogin } from "react-google-login";
import { useLocation, useNavigate } from "react-router-dom";

import { logIn } from "../../effector/auth";
import { IUserObj } from "../../utils/types";

const syncUserWithStorage = (userObj: IUserObj): IUserObj => {
  let currUser;
  let usersDb = localStorage.getItem("moviesDb")
    ? JSON.parse(localStorage.getItem("moviesDb") || "")
    : [];
  if (!Array.isArray(usersDb)) usersDb = [];
  currUser = usersDb.find((user: IUserObj) => user.id === userObj.id);
  if (currUser) return currUser;
  else {
    usersDb.push(userObj);
    localStorage.setItem("usersDb", JSON.stringify(usersDb));
    return userObj;
  }
};

const GoogleLogIn: React.FC<any> = (props) => {
  const navigate = useNavigate();
  let location = useLocation();
  let { from }: any = location.state || { from: { pathname: "/" } };
  const googleAuthSuccess = (response: any): void => {
    const newUserObj = {
      id: response.profileObj.googleId,
      firstName: response.profileObj.givenName,
      lastName: response.profileObj.familyName,
      email: response.profileObj.email,
      password: "",
      role: "user",
      token: response.getAuthResponse().id_token,
    };
    logIn(syncUserWithStorage(newUserObj));
    navigate(from);
  };

  const googleAuthFailure = (response: any): void => {
    console.log(response);
  };

  return (
    <GoogleLogin
      {...props}
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      onSuccess={googleAuthSuccess}
      onFailure={googleAuthFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
};
export default GoogleLogIn;
