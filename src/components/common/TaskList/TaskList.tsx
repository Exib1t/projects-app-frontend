import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProject } from '../../../hooks/projects/useProject';
import { Box, Button, Divider, List, ListItemButton, Stack, Typography, useTheme } from '@mui/material';
import Icon from '../Icon/Icon';
import { IconTypes } from '../../../constants';
import { useAppDispatch, useAppSelector } from '../../../hooks/global';
import { getTasks } from '../../../store/reducers/tasks/tasksThunk';
import { getComments } from '../../../store/reducers/comments/commentsThunk';

const TaskList = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { projectId, taskId } = useParams();
  const { tasks, sorting } = useAppSelector(state => state.tasks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (projectId && taskId) {
      dispatch(getTasks({ projectId, sorting }));
      dispatch(getComments({ projectId, taskId }));
    }
  }, []);

  return (
    <Stack
      sx={{
        width: '100%',
        maxWidth: '350px',
        minHeight: 'calc(100vh - 100px)',
        border: `2px solid ${theme.palette.secondary.dark}`,
        borderRadius: '5px',
        background: theme.palette.secondary.dark,
        py: 1,
      }}
    >
      <Typography variant="h6" textAlign="center" fontWeight={400} color="text.primary">
        Tasks
      </Typography>
      <Stack direction="row" justifyContent="space-between" p={1} alignItems="center" borderBottom={`1px solid ${theme.palette.divider}`}>
        <Typography variant="body1" color="text.primary">
          Amount: {tasks.length}
        </Typography>
        <Button size="small" sx={{ fontWeight: 900, px: 3, py: '2px' }} onClick={() => navigate(`/projects/${projectId}/tasks/add`)}>
          +ADD
        </Button>
      </Stack>

      <List sx={{ width: '100%' }}>
        {tasks.map(task => {
          return (
            <React.Fragment key={task.id}>
              <ListItemButton sx={{ gap: 1, alignItems: 'flex-start' }} onClick={() => navigate(String(task.id))}>
                <Box mt={'5px'}>{getTypeIcon(task.type)}</Box>
                <Stack gap={'5px'}>
                  <Typography color="primary.main" fontWeight={taskId === String(task.id) ? 700 : 400}>
                    {task.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.primary"
                    fontWeight={taskId === String(task.id) ? 500 : 400}
                    sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '280px', overflow: 'hidden' }}
                  >
                    {task.subtitle}
                  </Typography>
                </Stack>
              </ListItemButton>
              <Divider variant="fullWidth" sx={{ backgroundColor: theme.palette.divider }} />
            </React.Fragment>
          );
        })}
      </List>
    </Stack>
  );
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'task':
      return <Icon type={IconTypes.task} fontSize="15px" />;
    case 'bug':
      return <Icon type={IconTypes.bug} fontSize="15px" />;
    default:
      return <Icon type={IconTypes.task} fontSize="15px" />;
  }
};

export default TaskList;
