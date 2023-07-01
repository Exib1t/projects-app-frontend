import Stack from '@mui/material/Stack/Stack';
import React from 'react';
import { Typography, useTheme } from '@mui/material';
import ProjectList from '../../common/ProjectList/ProjectList';
import { Outlet, useLocation, useParams } from 'react-router-dom';

const ProjectsPage = () => {
  const theme = useTheme();
  const { projectId } = useParams();
  const location = useLocation();

  return (
    <Stack bgcolor={theme.palette.secondary.main} direction="row" alignItems="stretch">
      <ProjectList />
      <Stack p={2} width="100%">
        {projectId || location.pathname.includes('projects/add') ? (
          <Outlet />
        ) : (
          <Typography variant="h6" textAlign="center" width="100%" color="text.primary">
            You have not selected a project
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};

export default ProjectsPage;
