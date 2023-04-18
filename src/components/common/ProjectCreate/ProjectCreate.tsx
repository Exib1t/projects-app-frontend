import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography, useTheme } from '@mui/material';
import GoBackBtn from '../../controls/GoBackBtn/GoBackBtn';
import { IProject, IUserSelect } from '../../../models';
import { CirclePicker } from 'react-color';
import { IconTypes, projectColors } from '../../../constants';
import api from '../../../services/api';
import { toast } from 'react-toastify';
import { getProjects } from '../../../store/reducers/projects/projectsThunk';
import { useAppDispatch, useAppSelector } from '../../../hooks/global';
import Icon from '../Icon/Icon';

const ProjectCreate = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { sorting } = useAppSelector(state => state.projects);
  const [availableUsers, setAvailableUsers] = useState<IUserSelect[]>([]);
  const [project, setProject] = useState<IProject>({
    id: null,
    title: '',
    color: '',
    userIds: [],
    tasks: [],
  });

  const handleInputChange = (e: any) => {
    setProject(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const fetchAvailableUsers = async () => {
    const { data } = await api.get('projects/get_users');
    setAvailableUsers(data);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    api
      .post(`projects`, project)
      .then(response => {
        toast.success('Project created');
        dispatch(getProjects(sorting));
      })
      .catch(err => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    fetchAvailableUsers();
  }, []);

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
          Add Project
        </Typography>
        <GoBackBtn />
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
          Create
        </Button>
      </Stack>
    </Box>
  );
};

export default ProjectCreate;
