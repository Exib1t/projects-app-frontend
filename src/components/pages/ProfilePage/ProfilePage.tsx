import React from 'react';
import { Stack, useTheme } from '@mui/material';
import ProfileEditor from '../../common/ProfileEditor/ProfileEditor';

const ProfilePage = () => {
  const theme = useTheme();

  return (
    <Stack bgcolor={theme.palette.secondary.main} direction="row" sx={{ minHeight: 'calc(100vh - 64px)' }}>
      <ProfileEditor />
    </Stack>
  );
};

export default ProfilePage;
