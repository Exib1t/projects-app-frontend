import Icon from '../components/common/Icon/Icon';
import { IconTypes } from '../constants';
import { Typography } from '@mui/material';
import React from 'react';

export const taskHelpers = {
  getTypeIcon: (type: string) => {
    switch (type) {
      case '1':
        return (
          <>
            <Icon type={IconTypes.task} fontSize={15} />
            <Typography sx={{ fontWeight: 500 }}>Task</Typography>
          </>
        );
      case '2':
        return (
          <>
            <Icon type={IconTypes.task} fontSize={15} />
            <Typography sx={{ fontWeight: 500 }}>Subtasks</Typography>
          </>
        );
      case '3':
        return (
          <>
            <Icon type={IconTypes.bug} fontSize={15} />
            <Typography sx={{ fontWeight: 500 }}>Bug</Typography>
          </>
        );
      default:
        return null;
    }
  },

  getPriorityIcon: (priority: string) => {
    switch (priority) {
      case '1':
        return (
          <>
            <Icon type={IconTypes.priorityLow} fontSize={15} />
            <Typography sx={{ fontWeight: 500 }}>Low</Typography>
          </>
        );
      case '2':
        return (
          <>
            <Icon type={IconTypes.priorityMedium} fontSize={15} />
            <Typography sx={{ fontWeight: 500 }}>Medium</Typography>
          </>
        );
      case '3':
        return (
          <>
            <Icon type={IconTypes.priorityHigh} fontSize={15} />
            <Typography sx={{ fontWeight: 500 }}>High</Typography>
          </>
        );
      default:
        return null;
    }
  },

  getStatusText: (statusCode: 1 | 2 | 3) => {
    switch (statusCode) {
      case 1:
        return 'To Do';
      case 2:
        return 'In Progress';
      case 3:
        return 'Done';
    }
  },

  getStatusColor: (statusCode: 1 | 2 | 3): 'primary' | 'info' | 'success' => {
    switch (statusCode) {
      case 1:
        return 'primary';
      case 2:
        return 'info';
      case 3:
        return 'success';
    }
  },
};
