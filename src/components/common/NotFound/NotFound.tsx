import React, { FC } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { Error, Undo } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

type Props = {
  title: string;
  link: string;
  btnLabel: string;
};

const NotFound: FC<Props> = ({ title, link, btnLabel }) => {
  const navigate = useNavigate();

  return (
    <Stack justifyContent="center" alignItems="center" width="100%" minHeight={'calc(100vh - 100px)'} gap={2}>
      <Error fontSize="large" />
      <Typography variant="h4" color="text.primary">
        {title}
      </Typography>
      <Button size="medium" color="primary" startIcon={<Undo />} onClick={() => navigate(link)}>
        {btnLabel}
      </Button>
    </Stack>
  );
};

export default NotFound;
