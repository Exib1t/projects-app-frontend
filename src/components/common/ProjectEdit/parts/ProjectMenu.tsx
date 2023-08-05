import React, { FC } from "react";
import {
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  useTheme,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../../../Router/routes";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../../hooks/global";
import {
  deleteProject,
  getProjects,
} from "../../../../store/reducers/projects/projectsThunk";

type Props = {
  menuAnchorEl: HTMLElement | null;
  handleMenuClose: () => void;
};

const ProjectMenu: FC<Props> = ({ menuAnchorEl, handleMenuClose }) => {
  const { sorting } = useAppSelector((state) => state.projects);
  const { projectId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleDelete = async () => {
    if (!projectId) return null;
    dispatch(deleteProject(projectId))
      .unwrap()
      .then(async (res) => {
        await dispatch(getProjects(sorting));
        toast.error(res.msg);
        navigate(ROUTES.PROJECTS);
      });
  };

  return (
    <Menu
      anchorEl={menuAnchorEl}
      open={!!menuAnchorEl}
      onClose={handleMenuClose}
    >
      <MenuList sx={{ width: "200px", maxWidth: "100%", p: "0", pt: 1 }}>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            handleDelete();
          }}
        >
          <ListItemIcon>
            <Delete color="error" />
          </ListItemIcon>
          <ListItemText sx={{ color: theme.palette.error.main }}>
            Delete
          </ListItemText>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProjectMenu;
