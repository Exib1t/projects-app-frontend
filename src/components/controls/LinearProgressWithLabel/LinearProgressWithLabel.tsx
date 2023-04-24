import React from 'react';
import { Box, LinearProgress, LinearProgressProps, Typography } from '@mui/material';

const LinearProgressWithLabel = (props: LinearProgressProps & { value: number; estimated?: number }) => {
  const progressValue = props.estimated === 0 && props.value !== 0 ? 100 : props.value > 100 ? 100 : props.value;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100px', mr: 1 }}>
        <LinearProgress valueBuffer={0} variant="buffer" sx={{ height: 8, borderRadius: '2px' }} {...props} value={progressValue} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary" fontWeight={500}>{`${props.value}h`}</Typography>
      </Box>
    </Box>
  );
};

export default LinearProgressWithLabel;
