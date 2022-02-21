import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStore } from "effector-react";

import MenuItem from "@material-ui/core/MenuItem";

import { SwitchLang } from "features/switchLang";
import { ButtonGeneric, ButtonNav, GoogleLogOut, FadeMenu } from "shared/ui";
import { ViewContext } from "app";
import { userModel } from "entities/user";
import "./index.scss";

export const Header = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const user = useStore(userModel.$currentUser);
  const isAuthenticated = useStore(userModel.$isAuthenticated);
  const viewsContext = useContext(ViewContext);

  const mobileControlsView = (
    <>
      <ButtonNav to="/profile">{t("common.myProfile")}</ButtonNav>
      {user?.token ? (
        <GoogleLogOut
          onClick={userModel.logOut}
          render={(renderProps: any) => (
            <ButtonGeneric
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              event="logOut">
              {t("common.logOut")}
            </ButtonGeneric>
          )}
        />
      ) : (
        <ButtonGeneric event="logOut" onClick={userModel.logOut}>
          {t("common.logOut")}
        </ButtonGeneric>
      )}
    </>
  );

  const desktopControlsView = [
    { defaultComponent: true, props: { component: Link, to: "/profile" }, children: t("common.myProfile") },
    user?.token ? {
      component: GoogleLogOut,
      props: {
        render: (renderProps: any) => (
          <MenuItem
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}>
            {t("common.logOut")}
          </MenuItem>
        )
      },
      onClick: userModel.logOut
    } : { defaultComponent: true, props: {}, children: t("common.logOut"), onClick: userModel.logOut }
  ];

  return (
    <header className="header">
      <h2 className="header__title">
        <Link to="/">Movie-App</Link>
      </h2>

      <div className="header__controls">
        <SwitchLang />
        {isAuthenticated ? (
          viewsContext
            ? mobileControlsView
            : <FadeMenu menuItems={desktopControlsView} />
        ) : (
          <>
            <ButtonNav to={{ pathname: "/login", state: { from: location } }}>
              {t("common.logIn")}
            </ButtonNav>
            <ButtonNav to={{ pathname: "/signup", state: { from: location } }}>
              {t("common.signUp")}
            </ButtonNav>
          </>
        )}
      </div>
    </header>
  );
};
