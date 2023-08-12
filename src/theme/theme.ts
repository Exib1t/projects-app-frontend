import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#DBA34E",
      light: "#d9a944",
      dark: "#a97e23",
    },
    secondary: {
      main: "#1A1B22",
      dark: "#16161e",
    },
    text: {
      primary: "#D6D6D6",
      secondary: "#FFFFFF",
    },
    success: {
      main: "#20b620",
      dark: "#008f00",
      light: "#00FF00",
    },
    divider: "rgba(255,255,255,0.23)",
  },
  typography: {
    h1: {
      fontWeight: 700,
      fontSize: "38px",
    },
    h2: {
      fontWeight: 700,
      fontSize: "32px",
    },
    body1: {
      fontWeight: 400,
      fontSize: "16px",
    },
    body2: {
      fontWeight: 300,
      fontSize: "12px",
    },
  },
  spacing: [5, 10, 15, 20, 25, 30],
  components: {
    MuiTypography: {
      defaultProps: {
        color: "var(--text-primary)",
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
        sx: {
          fontWeight: 900,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--divider) !important",
          },
          "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--divider) !important",
          },
          "& .Mui-disabled .MuiOutlinedInput-input": {
            WebkitTextFillColor: "rgba(255,255,255,0.43) !important",
          },
          "& .Mui-disabled:placeholder": {
            color: "var(--divider) !important",
          },
          "& .MuiFormLabel-root.Mui-disabled": {
            color: "var(--text-light) !important",
          },
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--main) !important",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--divider) !important",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--main) !important",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          display: "flex",
          alignItems: "center",
          gap: 10,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          // backgroundColor: "#16161e",
        },
      },
    },
    MuiListItemText: {
      defaultProps: {
        sx: {
          "& .MuiTypography-root": {
            fontFamily: "Ubuntu",
            fontWeight: 500,
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "transparent",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          width: "100%",
          boxShadow: "none",
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: "0 !important",
          minHeight: "auto",
          "&.Mui-expanded": {
            minHeight: "auto !important",
          },
        },
        content: {
          margin: "0",
          alignItems: "center",
          "&.Mui-expanded": {
            margin: "0 !important",
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: "0 !important",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        listbox: {
          background: "#1A1B22",
          borderRadius: 0,
        },
        option: {
          color: "#d6d6d6",
        },
        tag: {
          background: "#DBA34E",
          color: "#1A1B22",
        },
        root: {
          "& .MuiSvgIcon-root path": {
            fill: "#d6d6d6",
          },
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          background: "#1A1B22",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          color: "#DBA34E",
          borderColor: "#DBA34E",
          paddingTop: "0",
          paddingBottom: "0",
          fontWeight: 700,
          "&.Mui-selected": {
            background: "#DBA34E",
            color: "#1A1B22",
          },
        },
      },
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#DBA34E",
      light: "#d9a944",
      dark: "#a97e23",
    },
    secondary: {
      main: "#D6D6D6",
      dark: "#FFFFFF",
    },
    text: {
      primary: "#16161e",
      secondary: "#1A1B22",
    },
    success: {
      main: "#20b620",
      dark: "#008f00",
      light: "#00FF00",
    },
    divider: "rgba(0,0,0,0.23)",
  },
  typography: {
    h1: {
      fontWeight: 700,
      fontSize: "38px",
    },
    h2: {
      fontWeight: 700,
      fontSize: "32px",
    },
    body1: {
      fontWeight: 400,
      fontSize: "16px",
    },
    body2: {
      fontWeight: 300,
      fontSize: "12px",
    },
  },
  spacing: [5, 10, 15, 20, 25, 30],
  components: {
    MuiTypography: {
      defaultProps: {
        color: "var(--text-primary)",
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
        sx: {
          fontWeight: 900,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--divider) !important",
          },
          "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--divider) !important",
          },
          "& .Mui-disabled .MuiOutlinedInput-input": {
            WebkitTextFillColor: "rgba(0,0,0,0.43) !important",
          },
          "& .Mui-disabled:placeholder": {
            color: "var(--divider) !important",
          },
          "& .MuiFormLabel-root.Mui-disabled": {
            color: "var(--text-light) !important",
          },
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--main) !important",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--divider) !important",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--main) !important",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          display: "flex",
          alignItems: "center",
          gap: 10,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
        },
      },
    },
    MuiListItemText: {
      defaultProps: {
        sx: {
          "& .MuiTypography-root": {
            fontFamily: "Ubuntu !important",
            fontWeight: 500,
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "transparent",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          width: "100%",
          boxShadow: "none",
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: "0 !important",
          minHeight: "auto",
          "&.Mui-expanded": {
            minHeight: "auto !important",
          },
        },
        content: {
          margin: "0",
          alignItems: "center",
          "&.Mui-expanded": {
            margin: "0 !important",
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: "0 !important",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        listbox: {
          background: "#D6D6D6",
          borderRadius: 0,
        },
        option: {
          color: "#1A1B22",
        },
        tag: {
          background: "#DBA34E",
          color: "#D6D6D6",
        },
        root: {
          "& .MuiSvgIcon-root path": {
            fill: "#1A1B22",
          },
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          background: "#D6D6D6",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          color: "#DBA34E",
          borderColor: "#DBA34E",
          paddingTop: "0",
          paddingBottom: "0",
          fontWeight: 700,
          "&.Mui-selected": {
            background: "#DBA34E",
            color: "#1A1B22",
          },
        },
      },
    },
  },
});
