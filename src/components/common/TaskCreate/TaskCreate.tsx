import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/global";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Icon from "../Icon/Icon";
import { IconTypes, quillModules } from "../../../constants";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IProjectTask, IProjectTaskCreate } from "../../../models";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { setProjects } from "../../../store/reducers/projects/projectsSlicer";
import GoBackBtn from "../../controls/GoBackBtn/GoBackBtn";
import { getProjects } from "../../../store/reducers/projects/projectsThunk";
import TaskProvider from "../../../services/TaskProvider";
import { getTasks } from "../../../store/reducers/tasks/tasksThunk";

const TaskCreate = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { projectId } = useParams();
  const dispatch = useAppDispatch();
  const { projects, sorting } = useAppSelector((state) => state.projects);
  const { sorting: taskSorting } = useAppSelector((state) => state.tasks);
  const [task, setTask] = useState<IProjectTaskCreate>({
    id: null,
    title: "New Task",
    subtitle: "",
    type: "",
    priority: "",
    description: "",
    comments: [],
    estimate: "",
  });

  const handleInputChange = (e: any) => {
    setTask((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!projectId) return null;
    const { data } = await TaskProvider.createOne(projectId, task);
    toast.success("Task created");
    // await dispatch(getProjects(sorting));
    await dispatch(getTasks({ projectId, sorting: taskSorting }));
    navigate(`/projects/${projectId}/tasks/${data.id}`);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "calc(100vh - 100px)",
        border: `2px solid ${theme.palette.secondary.dark}`,
        borderRadius: "5px",
        background: theme.palette.secondary.dark,
        p: 2,
        gap: 1,
      }}
    >
      <Stack direction="row" justifyContent="space-between" gap={1} mb={2}>
        <Typography
          color="primary.main"
          variant="h6"
          fontWeight={700}
          textAlign="center"
        >
          Add Task
        </Typography>
        <GoBackBtn />
      </Stack>
      <Stack direction="row" gap={1} alignItems="center">
        <Typography
          variant="body1"
          fontWeight={400}
          width="100px"
          color="text.primary"
        >
          Title:
        </Typography>
        <TextField
          size="small"
          label="Title"
          placeholder="New Task"
          value={task.title}
          name="title"
          onChange={handleInputChange}
          sx={{ width: "50%" }}
          required
        />
      </Stack>
      <Stack direction="row" gap={1} alignItems="center">
        <Typography
          variant="body1"
          fontWeight={400}
          width="100px"
          color="text.primary"
        >
          Subtitle:
        </Typography>
        <TextField
          size="small"
          label="Subtitle"
          placeholder="New Subtitle"
          value={task.subtitle}
          name="subtitle"
          onChange={handleInputChange}
          sx={{ width: "50%" }}
          required
        />
      </Stack>
      <Stack direction="row" gap={1} alignItems="center">
        <Typography
          variant="body1"
          fontWeight={400}
          width="100px"
          color="text.primary"
        >
          Type:
        </Typography>
        <FormControl size="small" sx={{ width: "50%" }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={task.type}
            name="type"
            label="Type"
            onChange={handleInputChange}
            required
          >
            <MenuItem
              value={1}
              sx={{ display: "flex", gap: 1, alignItems: "center" }}
            >
              <Icon type={IconTypes.task} fontSize={15} />
              Task
            </MenuItem>
            <MenuItem
              value={2}
              sx={{ display: "flex", gap: 1, alignItems: "center" }}
            >
              <Icon type={IconTypes.task} fontSize={15} />
              Subtask
            </MenuItem>
            <MenuItem
              value={3}
              sx={{ display: "flex", gap: 1, alignItems: "center" }}
            >
              <Icon type={IconTypes.bug} fontSize={15} />
              Bug
            </MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Stack direction="row" gap={1} alignItems="center">
        <Typography
          variant="body1"
          fontWeight={400}
          width="100px"
          color="text.primary"
        >
          Priority:
        </Typography>
        <FormControl size="small" sx={{ width: "50%" }}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={task.priority}
            name="priority"
            label="Priority"
            onChange={handleInputChange}
            required
          >
            <MenuItem
              value={1}
              sx={{ display: "flex", gap: 1, alignItems: "center" }}
            >
              <Icon type={IconTypes.priorityLow} fontSize={15} />
              Low
            </MenuItem>
            <MenuItem
              value={2}
              sx={{ display: "flex", gap: 1, alignItems: "center" }}
            >
              <Icon type={IconTypes.priorityMedium} fontSize={15} />
              Medium
            </MenuItem>
            <MenuItem
              value={3}
              sx={{ display: "flex", gap: 1, alignItems: "center" }}
            >
              <Icon type={IconTypes.priorityHigh} fontSize={15} />
              High
            </MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Stack direction="row" gap={1} alignItems="center">
        <Typography
          variant="body1"
          fontWeight={400}
          width="100px"
          color="text.primary"
        >
          Estimate Remaining:
        </Typography>
        <TextField
          size="small"
          placeholder="12h"
          value={task.estimate}
          name="estimate"
          onChange={handleInputChange}
          sx={{ width: "100px" }}
          required
        />
      </Stack>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight={400} color="text.primary">
          Description
        </Typography>
        <ReactQuill
          modules={quillModules}
          value={task.description}
          onChange={(val) =>
            setTask((prevState) => ({ ...prevState, description: val }))
          }
        />
      </Stack>
      <Stack
        bgcolor="secondary.dark"
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        p={2}
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
        }}
      >
        <Button size="small" type="submit" sx={{ px: 4, fontWeight: 900 }}>
          Create
        </Button>
      </Stack>
    </Box>
  );
};

export default TaskCreate;
