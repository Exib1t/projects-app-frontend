import React, { FC } from 'react';
import { Stack, Typography, useTheme } from '@mui/material';
import ProgressBar from '@ramonak/react-progress-bar';
import LinearProgressWithLabel from '../../../controls/LinearProgressWithLabel/LinearProgressWithLabel';

type Props = {
  data: {
    estimated: number;
    remaining: number;
    logged: number;
  };
};

const TaskTimeTracking: FC<Props> = ({ data }) => {
  const theme = useTheme();
  return (
    <Stack alignItems="center" gap={1}>
      <Stack direction="row" alignItems="center" gap={1} sx={{ fontWeight: 200, width: '100%' }}>
        <Typography variant="body1" fontWeight={500} color="text.primary" width="100px">
          Estimated
        </Typography>
        <LinearProgressWithLabel bgColor={theme.palette.primary.main} type="estimated" value={data.estimated} />
      </Stack>
      <Stack direction="row" alignItems="center" gap={1} sx={{ fontWeight: 200, width: '100%' }}>
        <Typography variant="body1" fontWeight={500} color="text.primary" width="100px">
          Remaining
        </Typography>
        <LinearProgressWithLabel bgColor={theme.palette.info.main} estimated={data.estimated} type="remaining" value={data.remaining} />
      </Stack>
      <Stack direction="row" alignItems="center" gap={1} sx={{ fontWeight: 200, width: '100%' }}>
        <Typography variant="body1" fontWeight={500} color="text.primary" width="100px">
          Logged
        </Typography>
        <LinearProgressWithLabel bgColor={theme.palette.success.main} type="logged" estimated={data.estimated} value={data.logged} />
      </Stack>
    </Stack>
  );
};

export default TaskTimeTracking;
