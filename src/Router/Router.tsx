import React, { useEffect } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import SignInPage from '../components/pages/SignInPage/SignInPage';
import SignUpPage from '../components/pages/SignUpPage/SignUpPage';
import Layout from '../components/common/Layout/Layout';
import { useAuth } from '../services/authProvider';
import { useAppSelector } from '../hooks/global';
import ProfilePage from '../components/pages/ProfilePage/ProfilePage';
import { ROUTES } from './routes';
import ProjectsPage from '../components/pages/ProjectsPage/ProjectsPage';
import TaskDetails from '../components/common/TaskDetails/TaskDetails';
import TaskSection from '../components/common/TaskSection/TaskSection';
import TaskCreate from '../components/common/TaskCreate/TaskCreate';
import TaskEdit from '../components/common/TaskEdit/TaskEdit';
import ProjectCreate from '../components/common/ProjectCreate/ProjectCreate';
import UsersPage from '../components/pages/UsersPage/UsersPage';
import UsersList from '../components/common/UsersList/UsersList';
import { Backdrop, CircularProgress } from '@mui/material';
import ProjectEdit from '../components/common/ProjectEdit/ProjectEdit';
import AppearancePage from '../components/pages/AppearancePage/AppearancePage';

const Router = () => {
  const { authorized } = useAppSelector(state => state.user);
  const { refresh, isFetching } = useAuth();
  console.log(isFetching);

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
            <Route index element={<Navigate to={ROUTES.PROJECTS} />} />
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
            <Route path={ROUTES.APPEARANCE} element={<AppearancePage />} />
            <Route path={ROUTES.PROJECTS} element={<ProjectsPage />}>
              <Route path={ROUTES.PROJECT} element={<Outlet />}>
                <Route index element={<Navigate to={ROUTES.PROJECT_TASKS} />} />
                <Route path={ROUTES.PROJECT_TASKS} element={<TaskSection />}>
                  <Route path={ROUTES.PROJECT_TASK_CREATE} element={<TaskCreate />} />
                  <Route path={ROUTES.PROJECT_TASK} element={<TaskDetails />} />
                  <Route path={ROUTES.PROJECT_TASK_EDIT} element={<TaskEdit />} />
                </Route>
                <Route path={ROUTES.PROJECT_EDIT} element={<ProjectEdit />} />
                <Route path="*" element={<Navigate to={ROUTES.PROJECTS} />} />
              </Route>
              <Route path={ROUTES.PROJECT_CREATE} element={<ProjectCreate />} />
              <Route path="*" element={<Navigate to={ROUTES.PROJECT_TASKS} />} />
            </Route>
            <Route path={ROUTES.USERS} element={<UsersPage />}>
              <Route index element={<Navigate to={ROUTES.USERS_LIST} />} />
              <Route path={ROUTES.USERS_LIST} element={<UsersList />} />
              <Route path="*" element={<Navigate to={ROUTES.USERS_LIST} />} />
            </Route>
            <Route path="*" element={<Navigate to={ROUTES.PROJECTS} />} />
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to={ROUTES.SIGN_IN} />} />
            <Route path={ROUTES.SIGN_IN} element={<SignInPage />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUpPage />} />
            <Route path="*" element={<Navigate to={ROUTES.SIGN_IN} />} />
          </Route>
        </Routes>
      )}
    </>
  );
};

export default Router;
