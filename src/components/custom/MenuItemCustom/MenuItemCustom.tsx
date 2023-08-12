import React, { FC, ReactNode } from "react";
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuItemProps,
} from "@mui/material";
import { useThemeMode } from "../../../hooks/useThemeMode";
import "./MenuItemStyles.scss";

interface IProps extends MenuItemProps {
  icon?: ReactNode;
  size?: "small" | "medium" | "big";
  align?: "center" | "left" | "right";
}

const MenuItemCustom: FC<IProps> = ({
  size = "medium",
  align = "center",
  ...props
}) => {
  const theme = useThemeMode();

  return (
    <MenuItem
      className={`${theme}__menuItem size-${size} align-${align} ${
        props.className || ""
      }`}
      {...props}
    >
      {align === "right" ? (
        <>
          <ListItemText
            className={`${theme}__menuItemText align-${align} size-${size}`}
          >
            {props.children}
          </ListItemText>
          {props.icon ? (
            <ListItemIcon className={`${theme}__menuItemIcon size-${size}`}>
              {props.icon}
            </ListItemIcon>
          ) : null}
        </>
      ) : (
        <>
          {props.icon ? (
            <ListItemIcon className={`${theme}__menuItemIcon size-${size}`}>
              {props.icon}
            </ListItemIcon>
          ) : null}
          <ListItemText
            className={`${theme}__menuItemText align-${align} size-${size}`}
          >
            {props.children}
          </ListItemText>
        </>
      )}
    </MenuItem>
  );
};
export default MenuItemCustom;
