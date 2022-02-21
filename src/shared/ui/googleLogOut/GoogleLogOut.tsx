import React from "react";
import { GoogleLogout } from "react-google-login";

export const GoogleLogOut: React.FC<any> = (props) => {
  const handleLogOut = (): void => {
    props.onClick();
  };

  return (
    <GoogleLogout
      {...props}
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      onLogoutSuccess={handleLogOut}
    />
  );
};
