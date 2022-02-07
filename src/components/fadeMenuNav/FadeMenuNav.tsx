import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStore } from "effector-react";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import MenuIcon from "@material-ui/icons/Menu";

import GoogleLogOut from "../../common/googleLogOut/GoogleLogOut";
import { logOut, $currentUser } from "../../effector/auth";

const stylesUtils = {
  mainColor: "#2196F3",
};

const FadeMenuNavigation = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const { t } = useTranslation();

  const userToken = useStore($currentUser)?.token;

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleLogOut = (): void => {
    handleClose();
    logOut();
  };

  return (
    <>
      <Button
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}>
        <MenuIcon style={{ color: stylesUtils.mainColor }} fontSize="large" />
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}>
        <MenuItem
          style={{ color: stylesUtils.mainColor }}
          onClick={handleClose}
          component={Link}
          to="/profile">
          {t("common.myProfile")}
        </MenuItem>
        {userToken ? (
          <GoogleLogOut
            onLogoutSuccess={handleLogOut}
            render={(renderProps: any) => (
              <MenuItem
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}>
                {t("common.logOut")}
              </MenuItem>
            )}
          />
        ) : (
          <MenuItem onClick={handleLogOut}>{t("common.logOut")}</MenuItem>
        )}
      </Menu>
    </>
  );
};

export default FadeMenuNavigation;
