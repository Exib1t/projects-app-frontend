import React, { FC } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import { useThemeMode } from "../../../hooks/useThemeMode";
import "./NavLinkStyles.scss";

const NavLinkCustom: FC<NavLinkProps> = (props) => {
  const theme = useThemeMode();

  return (
    <NavLink
      to={props.to}
      className={`${theme}__navLink ${props.className || ""}`}
    >
      {props.children}
    </NavLink>
  );
};

export default NavLinkCustom;
