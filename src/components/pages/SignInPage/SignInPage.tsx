import React from 'react';
import SignInForm from '../../common/SignInForm/SignInForm';
import { Stack, useTheme } from '@mui/material';

const SignInPage = () => {
  const theme = useTheme();

  return (
    <Stack justifyContent="center" alignItems="center" bgcolor={theme.palette.secondary.main} sx={{ minHeight: 'calc(100vh - 64px)' }}>
      <SignInForm />
    </Stack>
  );
};

export default SignInPage;
