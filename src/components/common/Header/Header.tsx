import React, { MouseEvent, useState } from "react";
import { Button, IconButton, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Resources } from "../../../services/Resources";
import { useAppSelector } from "../../../hooks/global";
import Icon from "../Icon/Icon";
import { IconTypes } from "../../../constants";
import { useAuth } from "../../../services/authProvider";
import { DarkMode, Logout, Person } from "@mui/icons-material";
import { ROUTES } from "../../../Router/routes";
import NavLinkCustom from "../../custom/NavLinkCustom/NavLinkCustom";
import LogoLink from "../../controls/LogoLink/LogoLink";
import MenuCustom from "../../custom/MenuCustom/MenuCustom";
import MenuItemCustom from "../../custom/MenuItemCustom/MenuItemCustom";
import { useThemeMode } from "../../../hooks/useThemeMode";
import "./HeaderStyles.scss";

const Header = () => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const { authorized } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const theme = useThemeMode();

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <Stack direction="row" className={`${theme}__header`}>
      <Stack justifyContent="center">
        <LogoLink />
      </Stack>
      {authorized && (
        <Stack direction="row" alignItems="center" gap={2}>
          <NavLinkCustom to="projects">Projects</NavLinkCustom>
          <NavLinkCustom to="users">Users</NavLinkCustom>
        </Stack>
      )}
      <Stack direction="row" gap={1}>
        {authorized ? (
          <>
            <IconButton
              className={`${theme}__profileBtn`}
              onClick={handleMenuOpen}
            >
              <Icon type={IconTypes.account} />
            </IconButton>
            <MenuCustom
              anchorEl={menuAnchorEl}
              open={!!menuAnchorEl}
              onClose={handleMenuClose}
            >
              <MenuItemCustom
                onClick={() => {
                  handleMenuClose();
                  navigate(ROUTES.PROFILE);
                }}
                icon={<Person color="primary" />}
                align="right"
              >
                My account
              </MenuItemCustom>
              <MenuItemCustom
                onClick={() => {
                  handleMenuClose();
                  navigate(ROUTES.APPEARANCE);
                }}
                icon={<DarkMode color="primary" />}
                align="right"
              >
                Appearance
              </MenuItemCustom>
              <MenuItemCustom
                onClick={() => {
                  handleMenuClose();
                  logout();
                }}
                icon={<Logout color="primary" />}
                align="right"
              >
                Logout
              </MenuItemCustom>
            </MenuCustom>
          </>
        ) : (
          <>
            <Button color="primary" onClick={() => navigate(Resources.signIn)}>
              Sign In
            </Button>
            <Button color="primary" onClick={() => navigate(Resources.signUp)}>
              Sign Up
            </Button>
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default Header;
