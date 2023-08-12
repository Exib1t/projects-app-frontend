import React, { FC } from "react";
import { Menu, MenuList, MenuProps } from "@mui/material";
import { useThemeMode } from "../../../hooks/useThemeMode";
import "./MenuStyles.scss";

const MenuCustom: FC<MenuProps> = (props) => {
  const theme = useThemeMode();

  return (
    <Menu className={`${theme}__menu ${props.className || ""}`} {...props}>
      <MenuList sx={{ p: 0 }} className={`${theme}__menuList`}>
        {props.children}
      </MenuList>
    </Menu>
  );
};
export default MenuCustom;
