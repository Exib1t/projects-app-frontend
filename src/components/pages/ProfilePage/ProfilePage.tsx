import React from 'react';
import { Stack, useTheme } from '@mui/material';
import ProfileMenu from './parts/ProfileMenu/ProfileMenu';
import { Outlet } from 'react-router-dom';

const ProfilePage = () => {
  const theme = useTheme();

  return (
    <Stack bgcolor={theme.palette.secondary.main} direction="row">
      <ProfileMenu />
      <Outlet />
    </Stack>
  );
};

export default ProfilePage;
