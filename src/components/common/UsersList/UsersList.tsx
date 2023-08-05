import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { IProjectSelect, IUser } from "../../../models";
import { useAppDispatch } from "../../../hooks/global";
import {
  getUserProjects,
  getUsers,
} from "../../../store/reducers/user/userThunk";

const OverlayLoader = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
    }}
  >
    <CircularProgress />
  </Box>
);

const UsersList = () => {
  const theme = useTheme();
  const [users, setUsers] = useState<IUser[]>([]);
  const [availableProjects, setAvailableProjects] = useState<IProjectSelect[]>(
    []
  );
  const dispatch = useAppDispatch();

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      type: "number",
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
    },
    {
      field: "first_name",
      headerName: "First Name",
      flex: 5,
      type: "string",
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
    },
    {
      field: "last_name",
      headerName: "Last Name",
      flex: 5,
      type: "string",
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 5,
      type: "string",
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
    },
    {
      field: "projectIds",
      headerName: "Projects",
      flex: 5,
      type: "string",
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
      valueFormatter: ({ value }) => {
        if (availableProjects) {
          let projectNames = value.map((projectId: number) => {
            const filteredProject = availableProjects.find(
              (project) => project.id === projectId
            );
            if (filteredProject) {
              return filteredProject.title;
            } else {
              return value;
            }
          });
          if (projectNames.length > 3) {
            projectNames = projectNames.slice(0, 3);
            return `${projectNames.join(", ")}...`;
          }
          return projectNames.join(", ");
        } else {
          return value;
        }
      },
    },
  ];

  useEffect(() => {
    dispatch(getUsers()).unwrap().then(setUsers);
    dispatch(getUserProjects()).unwrap().then(setAvailableProjects);
  }, []);

  return (
    <Stack
      sx={{
        px: 2,
        py: 4,
      }}
    >
      <Typography variant="h5" fontWeight={500} textAlign="center" mb={2}>
        Users List
      </Typography>
      <DataGrid
        rows={users}
        columns={columns}
        autoHeight
        slots={{
          noRowsOverlay: OverlayLoader,
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10, 25, 50]}
        sx={{
          width: "100%",
          background: theme.palette.secondary.dark,
          borderColor: theme.palette.divider,
          "& .MuiDataGrid-withBorderColor": {
            borderColor: theme.palette.divider,
          },
          "& .MuiSvgIcon-root path": {
            fill: theme.palette.text.primary,
          },
          "& .MuiIconButton-root.Mui-disabled path": {
            fill: theme.palette.divider,
          },
        }}
      />
    </Stack>
  );
};

export default UsersList;
