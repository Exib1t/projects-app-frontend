import React from 'react';
import { Stack, useTheme } from '@mui/material';
import SignUpForm from '../../common/SignUpForm/SignUpForm';

const SignUpPage = () => {
  const theme = useTheme();

  return (
    <Stack justifyContent="center" alignItems="center" minHeight="100%" bgcolor={theme.palette.secondary.main} height="calc(100vh - 64px)">
      <SignUpForm />
    </Stack>
  );
};

export default SignUpPage;
