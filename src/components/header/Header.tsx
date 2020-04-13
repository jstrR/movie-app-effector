import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useTranslation } from "react-i18next";

import SwitchLang from "../../common/switchLang/SwitchLang";
import GoogleLogOut from "../../common/googleLogIn/GoogleLogIn";
import { ViewContext } from "../../utils/ViewsContextProvider";
import ButtonNav from "../../common/buttonNav/ButtonNav";
import ButtonGeneric from "../../common/buttonGeneric/ButtonGeneric";
import FadeMenuNav from "../fadeMenuNav/FadeMenuNav";
import { logOut } from "../../redux/modules/auth";
import "./Header.scss";
import { selectUserStatus } from "../../redux/selectors/auth";
import { IUserStatus } from "../../utils/types";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { t } = useTranslation();

  const userStatus: IUserStatus = useSelector(selectUserStatus, shallowEqual);
  const viewsContext = useContext(ViewContext);

  const handleLogOut = (): void => {
    dispatch(logOut());
  };

  const mobileControlsView = (
    <>
      <ButtonNav to="/profile">{t("common.myProfile")}</ButtonNav>
      {userStatus && userStatus.token ? (
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
        <ButtonGeneric event="logOut" onClick={handleLogOut}>
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
        {userStatus.isAuthenticated ? (
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
