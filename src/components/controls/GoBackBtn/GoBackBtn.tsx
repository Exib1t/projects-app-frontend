import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Undo } from '@mui/icons-material';

const GoBackBtn = ({ size = 'small' }: { size?: 'small' | 'large' | 'medium' }) => {
  const navigate = useNavigate();

  return (
    <Button color="primary" size={size} startIcon={<Undo />} onClick={() => navigate(-1)}>
      Back
    </Button>
  );
};

export default GoBackBtn;
