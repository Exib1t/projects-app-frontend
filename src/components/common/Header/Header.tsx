import React, { useState, MouseEvent } from 'react';
import { Button, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Stack, Typography, useTheme } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { Resources } from '../../../services/Resources';
import { useAppSelector } from '../../../hooks/global';
import Icon from '../Icon/Icon';
import { IconTypes } from '../../../constants';
import { useAuth } from '../../../services/authProvider';
import { DarkMode, Logout, Person } from '@mui/icons-material';
import { ROUTES } from '../../../Router/routes';

const Header = () => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const { authorized } = useAppSelector(state => state.user);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const theme = useTheme();

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <Stack
      direction="row"
      paddingX={3}
      paddingY={1}
      sx={{
        justifyContent: 'space-between',
        width: '100%',
        height: '64px',
        backgroundColor: 'secondary.dark',
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Stack justifyContent="center">
        <Typography variant="h5" fontWeight={700} color="primary.main" sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          Projects App
        </Typography>
      </Stack>
      {authorized && (
        <Stack direction="row" alignItems="center" gap={2}>
          <NavLink
            to="projects"
            className="b-navLink"
            style={{
              color: theme.palette.text.primary,
            }}
          >
            Projects
          </NavLink>
          <NavLink
            to="timers"
            className="b-navLink"
            style={{
              color: theme.palette.text.primary,
            }}
          >
            Timers
          </NavLink>
          <NavLink
            to="stats"
            className="b-navLink"
            style={{
              color: theme.palette.text.primary,
            }}
          >
            Stats
          </NavLink>
          <NavLink
            to="users"
            className="b-navLink"
            style={{
              color: theme.palette.text.primary,
            }}
          >
            Users
          </NavLink>
        </Stack>
      )}
      <Stack direction="row" gap={1}>
        {authorized ? (
          <>
            <IconButton sx={{ border: `1px solid ${theme.palette.divider}` }} onClick={handleMenuOpen}>
              <Icon type={IconTypes.account} />
            </IconButton>
            <Menu anchorEl={menuAnchorEl} open={!!menuAnchorEl} onClose={handleMenuClose}>
              <MenuList sx={{ width: '250px', maxWidth: '100%' }}>
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate(ROUTES.PROFILE);
                  }}
                >
                  <ListItemIcon>
                    <Person color="primary" />
                  </ListItemIcon>
                  <ListItemText>My account</ListItemText>
                </MenuItem>
                <Divider variant="middle" sx={{ background: theme.palette.divider }} />
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate(ROUTES.APPEARANCE);
                  }}
                >
                  <ListItemIcon>
                    <DarkMode color="primary" />
                  </ListItemIcon>
                  <ListItemText>Appearance</ListItemText>
                </MenuItem>
                <Divider variant="middle" sx={{ background: theme.palette.divider }} />
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    logout();
                  }}
                >
                  <ListItemIcon>
                    <Logout color="primary" />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </MenuList>
            </Menu>
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
