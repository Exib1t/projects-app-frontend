import Router from "./Router/Router";
import { darkTheme, lightTheme } from "./theme/theme";
import React from "react";
import { ThemeProvider } from "@mui/material";
import { useThemeMode } from "./hooks/useThemeMode";

function App() {
  const theme = useThemeMode();

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <div className={theme}>
        <Router />
      </div>
    </ThemeProvider>
  );
}

export default App;
