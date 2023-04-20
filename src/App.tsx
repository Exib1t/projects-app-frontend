import Router from './Router/Router';
import { darkTheme, lightTheme } from './theme/theme';
import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import { useAppDispatch, useAppSelector } from './hooks/global';
import { setTheme } from './store/reducers/globalSlicer';

function App() {
  const { theme } = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'light' || theme === 'dark') {
      dispatch(setTheme(theme));
    }
  }, []);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <div className={theme}>
        <Router />
      </div>
    </ThemeProvider>
  );
}

export default App;
