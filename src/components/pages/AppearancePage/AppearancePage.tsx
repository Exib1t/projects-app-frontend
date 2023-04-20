import React from 'react';
import { Outlet } from 'react-router-dom';
import { Stack, useTheme } from '@mui/material';
import AppearanceMenu from '../../common/AppearanceMenu/AppearanceMenu';

const AppearancePage = () => {
  const theme = useTheme();

  return (
    <Stack bgcolor={theme.palette.secondary.main} direction="row" p={2} sx={{ minHeight: 'calc(100vh - 64px)' }}>
      <AppearanceMenu />
    </Stack>
  );
};

export default AppearancePage;
