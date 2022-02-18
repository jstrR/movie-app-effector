import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStore } from "effector-react";

import SwitchLang from "../../common/switchLang/SwitchLang";
import GoogleLogOut from "../../common/googleLogIn/GoogleLogIn";
import { ViewContext } from "app";
import { ButtonNav } from "shared/components";
import { ButtonGeneric } from "shared/components";
import FadeMenuNav from "../fadeMenuNav/FadeMenuNav";
import "./Header.scss";
import { userModel } from "entities/user";

const Header = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const user = useStore(userModel.$currentUser);
  const isAuthenticated = useStore(userModel.$isAuthenticated);
  const viewsContext = useContext(ViewContext);

  const mobileControlsView = (
    <>
      <ButtonNav to="/profile">{t("common.myProfile")}</ButtonNav>
      {user?.token  ? (
        <GoogleLogOut
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

  const desktopControlsView = <FadeMenuNav />;

  const profileControlsViewy = viewsContext
    ? mobileControlsView
    : desktopControlsView;

  return (
    <header className="header">
      <h2 className="header__title">
        <Link to="/">Movie-App</Link>
      </h2>

      <div className="header__controls">
        <SwitchLang />
        {isAuthenticated ? (
          <> {profileControlsViewy}</>
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

export default Header;
