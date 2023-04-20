import React, { MouseEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/global';
import { Box, Button, IconButton, Stack, Typography, useTheme } from '@mui/material';
import Icon from '../Icon/Icon';
import { IconTypes } from '../../../constants';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import GoBackBtn from '../../controls/GoBackBtn/GoBackBtn';
import { taskHelpers } from '../../../helpers/taskHelpers';
import { MoreVert } from '@mui/icons-material';
import TaskMenu from './parts/TaskMenu';

const TaskDetails = () => {
  const { taskId, projectId } = useParams();
  const { projects } = useAppSelector(state => state.projects);
  const project = projects.filter(project => String(project.id) === projectId)[0];
  const task = project?.tasks.filter(task => String(task.id) === taskId)[0];
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  if (!task) return null;
  return (
    <Stack
      sx={{
        width: '100%',
        minHeight: 'calc(100vh - 100px)',
        border: `2px solid ${theme.palette.secondary.dark}`,
        borderRadius: '5px',
        background: theme.palette.secondary.dark,
        p: 2,
        gap: 2,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="body1" color="primary.main">
          {project.title} / {task.title}
        </Typography>
        <Stack direction="row" gap={1}>
          <Button color="primary" sx={{ p: 0, minWidth: 34 }} onClick={handleMenuOpen}>
            <MoreVert />
          </Button>
          <TaskMenu menuAnchorEl={menuAnchorEl} handleMenuClose={handleMenuClose} />
          <Button startIcon={<Icon type={IconTypes.editPencil} />} size="small" onClick={() => navigate('edit')}>
            Edit
          </Button>
          <GoBackBtn />
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center" gap={1} sx={{ fontWeight: 400 }} color="text.primary">
        <Box display="inline-flex" width="100px">
          Subtitle:
        </Box>{' '}
        <b style={{ fontWeight: 500 }}>{task.subtitle}</b>
      </Stack>
      <Stack direction="row" alignItems="center" gap={1} sx={{ fontWeight: 400 }}>
        <Box display="inline-flex" width="100px" color="text.primary">
          Type:
        </Box>{' '}
        {taskHelpers.getTypeIcon(task.type)}
      </Stack>
      <Stack direction="row" alignItems="center" gap={1} sx={{ fontWeight: 400 }}>
        <Box display="inline-flex" width="100px" color="text.primary">
          Priority:
        </Box>{' '}
        {taskHelpers.getPriorityIcon(task.priority)}
      </Stack>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight={400} color="text.primary">
          Description
        </Typography>
        <ReactQuill
          modules={{
            toolbar: false,
          }}
          className="readOnly"
          readOnly
          value={task.description}
        />
      </Stack>
    </Stack>
  );
};

export default TaskDetails;
