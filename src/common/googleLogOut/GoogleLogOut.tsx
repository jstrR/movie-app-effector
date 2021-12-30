import React from "react";
import { GoogleLogout } from "react-google-login";

import { logOut } from "../../effector/auth";

const GoogleLogOut: React.FC<any> = (props) => {

  const handleLogOut = (): void => {
    logOut();
  };

  return (
    <GoogleLogout
      {...props}
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      onLogoutSuccess={handleLogOut}
    />
  );
};
export default GoogleLogOut;
