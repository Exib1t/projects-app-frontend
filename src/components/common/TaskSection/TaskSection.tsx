import React from 'react';
import TaskList from '../TaskList/TaskList';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';

const TaskSection = () => {
  const { taskId } = useParams();
  const location = useLocation();

  return (
    <Stack direction="row" width="100%" gap={2}>
      <TaskList />
      {taskId || location.pathname.includes('tasks/add') ? (
        <Outlet />
      ) : (
        <Typography variant="h6" textAlign="center" width="100%" color="text.primary">
          You have not selected a task
        </Typography>
      )}
    </Stack>
  );
};

export default TaskSection;
