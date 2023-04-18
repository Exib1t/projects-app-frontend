import React, { useEffect } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import SignInPage from '../components/pages/SignInPage/SignInPage';
import SignUpPage from '../components/pages/SignUpPage/SignUpPage';
import Layout from '../components/common/Layout/Layout';
import { useAuth } from '../services/authProvider';
import { useAppSelector } from '../hooks/global';
import ProfilePage from '../components/pages/ProfilePage/ProfilePage';
import AccountTab from '../components/pages/ProfilePage/parts/AccountTab/AccountTab';
import { ROUTES } from './routes';
import ProjectsPage from '../components/pages/ProjectsPage/ProjectsPage';
import TaskDetails from '../components/common/TaskDetails/TaskDetails';
import TaskSection from '../components/common/TaskSection/TaskSection';
import TaskCreate from '../components/common/TaskCreate/TaskCreate';
import TaskEdit from '../components/common/TaskEdit/TaskEdit';
import ProjectCreate from '../components/common/ProjectCreate/ProjectCreate';
import UsersPage from '../components/pages/UsersPage/UsersPage';
import UsersList from '../components/common/UsersList/UsersList';
import Grid from '@mui/material/Grid/Grid';
import { Backdrop, CircularProgress } from '@mui/material';

const Router = () => {
  const { authorized } = useAppSelector(state => state.user);
  const { refresh, isFetching } = useAuth();

  useEffect(() => {
    refresh();
  }, []);

  if (isFetching) {
    return (
      <Backdrop open={true}>
        <CircularProgress />
      </Backdrop>
    );
  }

  return (
    <>
      {authorized ? (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to={ROUTES.projects} />} />
            <Route path={ROUTES.profile} element={<ProfilePage />}>
              <Route index element={<AccountTab />} />
            </Route>
            <Route path={ROUTES.projects} element={<ProjectsPage />}>
              <Route path=":projectId" element={<Outlet />}>
                <Route index element={<Navigate to="tasks" />} />
                <Route path="tasks" element={<TaskSection />}>
                  <Route path=":taskId" element={<TaskDetails />} />
                  <Route path=":taskId/edit" element={<TaskEdit />} />
                  <Route path="add" element={<TaskCreate />} />
                </Route>
                <Route path="*" element={<Navigate to="tasks" />} />
              </Route>
              <Route path="add" element={<ProjectCreate />} />
              <Route path="*" element={<Navigate to="/:projectId/tasks" />} />
            </Route>
            <Route path="users" element={<UsersPage />}>
              <Route index element={<Navigate to="list" />} />
              <Route path="list" element={<UsersList />} />
              <Route path="*" element={<Navigate to="list" />} />
            </Route>
            <Route path="*" element={<Navigate to={ROUTES.projects} />} />
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to={ROUTES.signIn} />} />
            <Route path={ROUTES.signIn} element={<SignInPage />} />
            <Route path={ROUTES.signUp} element={<SignUpPage />} />
            <Route path="*" element={<Navigate to={ROUTES.signIn} />} />
          </Route>
        </Routes>
      )}
    </>
  );
};

export default Router;
