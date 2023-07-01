import React, { MouseEvent, useEffect, useState } from 'react';
import { Autocomplete, Box, Button, Stack, TextField, Typography, useTheme } from '@mui/material';
import GoBackBtn from '../../controls/GoBackBtn/GoBackBtn';
import { IProject, IProjectCreate, IUserSelect } from '../../../models';
import { CirclePicker } from 'react-color';
import { projectColors } from '../../../constants';
import api from '../../../services/api';
import { toast } from 'react-toastify';
import { getProjects } from '../../../store/reducers/projects/projectsThunk';
import { useAppDispatch, useAppSelector } from '../../../hooks/global';
import { useParams } from 'react-router-dom';
import { MoreVert } from '@mui/icons-material';
import TaskMenu from '../TaskDetails/parts/TaskMenu';
import ProjectMenu from './parts/ProjectMenu';
import ProjectProvider from '../../../services/ProjectProvider';
import NotFound from '../NotFound/NotFound';
import { ROUTES } from '../../../Router/routes';

const ProjectEdit = () => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [availableUsers, setAvailableUsers] = useState<IUserSelect[]>([]);
  const { sorting, projects } = useAppSelector(state => state.projects);
  const dispatch = useAppDispatch();
  const { projectId } = useParams();
  const theme = useTheme();
  const [project, setProject] = useState<IProjectCreate>({
    id: null,
    title: '',
    color: '',
    userIds: [],
    tasks: [],
  });

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleInputChange = (e: any) => {
    setProject(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const fetchAvailableUsers = async () => {
    const { data } = await ProjectProvider.fetchAvailableUsers();
    setAvailableUsers(data);
  };

  const fetchEditableProject = async () => {
    if (!projectId) return null;
    const { data } = await ProjectProvider.fetchProject(projectId);
    setProject(data);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await ProjectProvider.updateProject(project);
    toast.success('Project updated');
    dispatch(getProjects(sorting));
  };

  useEffect(() => {
    fetchAvailableUsers();
    fetchEditableProject();
  }, [projectId]);

  if (!project?.id) return <NotFound title="Project Not Found" btnLabel="Back to projects" link={ROUTES.PROJECTS} />;
  if (!projects.some(p => p.id === project.id)) {
    return <NotFound title="You don`t have access to this project" btnLabel="Back to projects" link={ROUTES.PROJECTS} />;
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: 'calc(100vh - 100px)',
        border: `2px solid ${theme.palette.secondary.dark}`,
        borderRadius: '5px',
        background: theme.palette.secondary.dark,
        p: 2,
        gap: 1,
      }}
    >
      <Stack direction="row" justifyContent="space-between" gap={1} mb={2}>
        <Typography color="primary.main" variant="h6" fontWeight={700} textAlign="center">
          Edit Project
        </Typography>
        <Stack direction="row" gap={1}>
          <Button color="primary" sx={{ p: 0, minWidth: 34 }} onClick={handleMenuOpen}>
            <MoreVert />
          </Button>
          <ProjectMenu menuAnchorEl={menuAnchorEl} handleMenuClose={handleMenuClose} />
          <GoBackBtn />
        </Stack>
      </Stack>
      <Stack direction="row" gap={1} alignItems="center" mb={2}>
        <Typography variant="body1" fontWeight={400} width="100px">
          Title:
        </Typography>
        <TextField
          size="small"
          label="Title"
          placeholder="New Project"
          value={project.title}
          name="title"
          onChange={handleInputChange}
          sx={{ width: '50%' }}
          required
        />
      </Stack>
      <Stack direction="row" gap={1} alignItems="center" mb={2}>
        <Typography variant="body1" fontWeight={400} minWidth="100px">
          Color:
        </Typography>
        <CirclePicker
          color={project.color}
          colors={projectColors}
          width="100%"
          onChangeComplete={color => setProject(prevState => ({ ...prevState, color: color.hex }))}
        />
      </Stack>
      <Stack direction="row" gap={1} alignItems="center">
        <Typography variant="body1" fontWeight={400} width="100px">
          Users:
        </Typography>
        <Autocomplete
          size="small"
          options={availableUsers}
          sx={{ width: '50%' }}
          value={project.userIds.map(userId => availableUsers.find(user => user.id === userId) || { id: -1, fullName: '' })}
          multiple
          onChange={(event, values) => {
            const userIds = values.map(value => value.id);
            setProject(prevState => ({ ...prevState, userIds }));
          }}
          getOptionLabel={option => option.fullName}
          renderInput={params => <TextField {...params} label="Users" />}
        />
      </Stack>
      <Stack
        bgcolor="secondary.dark"
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        p={2}
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
        }}
      >
        <Button size="small" type="submit" sx={{ px: 4, fontWeight: 900 }}>
          Save
        </Button>
      </Stack>
    </Box>
  );
};

export default ProjectEdit;
