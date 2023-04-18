import React from 'react';
import { Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

const UsersPage = () => {
  return (
    <Stack bgcolor="secondary.main" height="calc(100vh - 64px)">
      <Outlet />
    </Stack>
  );
};

export default UsersPage;
