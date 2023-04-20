import React, { ChangeEvent, useEffect, useState } from 'react';
import { Divider, IconButton, List, ListItemButton, Stack, TextField, Typography, useTheme } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { IconTypes } from '../../../constants';
import { IProject } from '../../../models';
import Icon from '../Icon/Icon';
import { useAppDispatch, useAppSelector } from '../../../hooks/global';
import { getProjects } from '../../../store/reducers/projects/projectsThunk';
import { changeSorting } from '../../../store/reducers/projects/projectsSlicer';
import { AddCircle, Edit } from '@mui/icons-material';

const ProjectList = () => {
  const [search, setSearch] = useState<string>('');
  const { projects, sorting } = useAppSelector(state => state.projects);
  const [searchableProjects, setSearchableProjects] = useState<IProject[]>([]);
  const dispatch = useAppDispatch();
  const { projectId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSortingChange = () => {
    dispatch(changeSorting(''));
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (projects) {
      setSearchableProjects(projects.filter(project => project.title.toLowerCase().includes(search.toLowerCase())));
    }
  }, [search, projects]);

  useEffect(() => {
    dispatch(getProjects(sorting));
  }, [sorting]);

  return (
    <Stack gap={1} sx={{ backgroundColor: 'secondary.dark', py: 2, width: '100%', maxWidth: '300px', minHeight: 'calc(100vh - 64px)', position: 'relative' }}>
      <Stack direction="row" justifyContent="center" alignItems="center" px={2} gap={2}>
        <TextField color="primary" label="Search" size="small" fullWidth value={search} onChange={handleSearchChange} />
        <IconButton
          sx={{ borderRadius: '5px', background: theme.palette.primary.main, '&:hover': { background: theme.palette.primary.dark } }}
          onClick={handleSortingChange}
        >
          {sorting === 'DESC' ? <Icon type={IconTypes.sortDown} /> : <Icon type={IconTypes.sortUp} />}
        </IconButton>
      </Stack>

      <List sx={{ width: '100%' }}>
        <Divider variant="fullWidth" sx={{ backgroundColor: theme.palette.divider }} />
        {!searchableProjects.length && (
          <Typography variant="body1" p={2} textAlign="center">
            You have no projects
          </Typography>
        )}
        {searchableProjects.map(project => {
          return (
            <React.Fragment key={project.id}>
              <ListItemButton
                sx={{ justifyContent: 'space-between', borderLeft: `2px solid ${project.color}` }}
                onClick={e => {
                  e.stopPropagation();
                  navigate(`${project.id}/tasks`);
                }}
              >
                <Typography sx={{ my: '4px', fontWeight: projectId === String(project.id) ? 700 : 400 }} color="text.primary">
                  {project.title}
                </Typography>
                <IconButton
                  color="primary"
                  onClick={e => {
                    e.stopPropagation();
                    navigate(`${project.id}/edit`);
                  }}
                >
                  <Edit />
                </IconButton>
              </ListItemButton>
              <Divider variant="fullWidth" sx={{ backgroundColor: theme.palette.divider }} />
            </React.Fragment>
          );
        })}
      </List>

      <IconButton color="primary" sx={{ width: 'max-content', position: 'absolute', bottom: 20, right: 20 }} onClick={() => navigate('/projects/add')}>
        <AddCircle fontSize="large" />
      </IconButton>
    </Stack>
  );
};

export default ProjectList;
