import React, { FC } from 'react';
import { Divider, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, useTheme } from '@mui/material';
import { Delete, Edit, Logout, Person } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../../Router/routes';
import api from '../../../../services/api';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../../hooks/global';
import { getProjects } from '../../../../store/reducers/projects/projectsThunk';
import TaskProvider from '../../../../services/TaskProvider';
import { getTasks } from '../../../../store/reducers/tasks/tasksThunk';

type Props = {
  menuAnchorEl: HTMLElement | null;
  handleMenuClose: () => void;
};

const TaskMenu: FC<Props> = ({ menuAnchorEl, handleMenuClose }) => {
  const { sorting } = useAppSelector(state => state.projects);
  const { sorting: taskSorting } = useAppSelector(state => state.tasks);
  const { taskId, projectId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleDelete = async () => {
    if (!projectId || !taskId) return null;
    const { data } = await TaskProvider.deleteOne(projectId, taskId);
    dispatch(getProjects(sorting));
    dispatch(getTasks({ projectId, sorting: taskSorting }));
    toast.error(data.msg);
    navigate(ROUTES.PROJECT_TASKS.replace(':projectId', String(projectId)));
  };

  return (
    <Menu anchorEl={menuAnchorEl} open={!!menuAnchorEl} onClose={handleMenuClose}>
      <MenuList sx={{ width: '200px', maxWidth: '100%', p: '0', pt: 1 }}>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            navigate(ROUTES.PROJECT_TASK_EDIT.replace(':projectId', String(projectId)).replace(':taskId', String(taskId)));
          }}
        >
          <ListItemIcon>
            <Edit color="primary" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <Divider variant="middle" sx={{ background: theme.palette.divider }} />
        <MenuItem
          onClick={() => {
            handleMenuClose();
            handleDelete();
          }}
        >
          <ListItemIcon>
            <Delete color="error" />
          </ListItemIcon>
          <ListItemText sx={{ color: theme.palette.error.main }}>Delete</ListItemText>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default TaskMenu;
