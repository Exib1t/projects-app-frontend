import React, { FC } from 'react';
import { Box, LinearProgress, LinearProgressProps, Typography, useTheme } from '@mui/material';
import ProgressBar from '@ramonak/react-progress-bar';

interface Props {
  value: number;
  estimated?: number;
  bgColor: string;
  type: 'estimated' | 'remaining' | 'logged';
}

const LinearProgressWithLabel: FC<Props> = ({ value, estimated, bgColor, type }) => {
  const maxValue = getMaxValue();

  function getMaxValue() {
    switch (type) {
      case 'estimated':
        return 24;
      case 'remaining':
        return estimated;
      case 'logged':
        return estimated || 50;
    }
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100px', mr: 1 }}>
        <ProgressBar completed={value} customLabelStyles={{ fontSize: 0 }} maxCompleted={maxValue} bgColor={bgColor} height="10px" borderRadius="5px" />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary" fontWeight={500}>{`${value}h`}</Typography>
      </Box>
    </Box>
  );
};

export default LinearProgressWithLabel;
