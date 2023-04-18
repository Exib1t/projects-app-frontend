import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Undo } from '@mui/icons-material';

const GoBackBtn = () => {
  const navigate = useNavigate();

  return (
    <Button color="primary" size="small" startIcon={<Undo />} onClick={() => navigate(-1)}>
      Back
    </Button>
  );
};

export default GoBackBtn;
