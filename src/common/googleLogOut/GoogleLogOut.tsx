import React from "react";
import { GoogleLogout } from "react-google-login";

import { userModel } from "entities/user";

const GoogleLogOut: React.FC<any> = (props) => {

  const handleLogOut = (): void => {
    userModel.logOut();
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
