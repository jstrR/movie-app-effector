import React from "react";
import { GoogleLogin } from "react-google-login";

import { User } from "../../api";

const GoogleLogIn: React.FC<any> = ({ className, onLogin }) => {
  const googleAuthSuccess = (response: any) => {
    const newUserObj: User = {
      id: response.profileObj.googleId,
      firstName: response.profileObj.givenName,
      lastName: response.profileObj.familyName,
      email: response.profileObj.email,
      password: "",
      role: "user",
      token: response.getAuthResponse().id_token,
      movieRatings: []
    };
    onLogin(newUserObj)
  };

  const googleAuthFailure = (response: any): void => {
    console.log(response);
  };

  return (
    <GoogleLogin
      className={className}
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
      onSuccess={googleAuthSuccess}
      onFailure={googleAuthFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
};
export default GoogleLogIn;
