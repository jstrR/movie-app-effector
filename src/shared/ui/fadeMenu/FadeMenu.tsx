import React from "react";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import MenuIcon from "@material-ui/icons/Menu";

const stylesUtils = {
  mainColor: "#2196F3",
};

type IMenuItem = {
  defaultComponent?: boolean,
  component?: React.ElementType,
  props: object,
  children?: string | React.ElementType<any>,
  onClick?: Function
};

type IMenuItemsProps = {
  menuItems: IMenuItem[]
};

export const FadeMenu: React.FC<IMenuItemsProps> = ({ menuItems }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
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
        {menuItems.map((item, i) => (
          item.component
          ? <item.component {...item.props} key={i} onClick={() => { handleClose(); item.onClick && item.onClick()}}/>
          : <MenuItem {...item.props} key={i}>{item.children}</MenuItem>
        ))}
      </Menu>
    </>
  );
};
