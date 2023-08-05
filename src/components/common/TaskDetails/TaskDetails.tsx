import React, { MouseEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/global";
import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";
import Icon from "../Icon/Icon";
import { IconTypes } from "../../../constants";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import GoBackBtn from "../../controls/GoBackBtn/GoBackBtn";
import { taskHelpers } from "../../../helpers/taskHelpers";
import {
  AddCircle,
  AddComment,
  Delete,
  Edit,
  MoreVert,
} from "@mui/icons-material";
import TaskMenu from "./parts/TaskMenu";
import { getProjects } from "../../../store/reducers/projects/projectsThunk";
import { toast } from "react-toastify";
import CommentProvider from "../../../services/CommentProvider";
import CommentCreate from "../CommentCreate/CommentCreate";
import CommentEdit from "../CommentEdit/CommentEdit";
import { IProjectTaskComment } from "../../../models";
import TaskProvider from "../../../services/TaskProvider";
import { getTasks } from "../../../store/reducers/tasks/tasksThunk";
import { getComments } from "../../../store/reducers/comments/commentsThunk";
import TaskTimeModal from "../TaskTimeModal/TaskTimeModal";
import TaskTimeTracking from "./parts/TaskTimeTracking";

const TaskDetails = () => {
  const { taskId, projectId } = useParams();
  const { projects } = useAppSelector((state) => state.projects);
  const { tasks, sorting } = useAppSelector((state) => state.tasks);
  const { comments } = useAppSelector((state) => state.comments);
  const { userId } = useAppSelector((state) => state.user);
  const task = tasks.filter((task) => String(task.id) === taskId)[0];
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [commentState, setCommentState] = useState<"create" | "edit" | "none">(
    "none"
  );
  const [editableComment, setEditableComment] =
    useState<IProjectTaskComment | null>(null);
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const project = projects?.find((project) => project.id === Number(projectId));

  if (!task || !projectId || !taskId || !project) return null;

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleCommentDelete = async (
    e: MouseEvent<HTMLButtonElement>,
    commentId: number
  ) => {
    if (!projectId || !taskId) return null;
    await CommentProvider.deleteOne(projectId, taskId, commentId);
    dispatch(getProjects(sorting));
    dispatch(getTasks({ projectId, sorting }));
    dispatch(getComments({ projectId, taskId }));
    toast.error("Comment deleted");
  };

  const handleCommentCancel = () => {
    setCommentState("none");
  };

  const handleTimeModalOpen = () => {
    setIsTimeModalOpen(true);
  };

  const handleTimeModalClose = () => {
    setIsTimeModalOpen(false);
  };

  const handleCommentEdit = (
    e: MouseEvent<HTMLButtonElement>,
    comment: IProjectTaskComment
  ) => {
    setCommentState("edit");
    setEditableComment(comment);
  };

  const handleStatusChange = async (
    e: MouseEvent<HTMLElement>,
    value: 1 | 2 | 3
  ) => {
    await TaskProvider.updateStatus(projectId, taskId, value);
    dispatch(getProjects(sorting));
    dispatch(getTasks({ projectId, sorting }));
    dispatch(getComments({ projectId, taskId }));
    toast.success("Status updated");
  };

  const getCommentEditor = () => {
    switch (commentState) {
      case "create":
        return <CommentCreate handleCommentCancel={handleCommentCancel} />;
      case "edit":
        if (editableComment) {
          return (
            <CommentEdit
              handleCommentCancel={handleCommentCancel}
              data={editableComment}
            />
          );
        } else {
          return null;
        }
      default:
        return (
          <Button
            color="primary"
            startIcon={<AddComment />}
            onClick={() => setCommentState("create")}
            sx={{
              width: "max-content",
            }}
          >
            Add comment
          </Button>
        );
    }
  };

  return (
    <>
      <Stack
        sx={{
          width: "100%",
          minHeight: "calc(100vh - 100px)",
          border: `2px solid ${theme.palette.secondary.dark}`,
          borderRadius: "5px",
          background: theme.palette.secondary.dark,
          p: 2,
          gap: 2,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body1" color="primary.main">
            {project.title} / {task.title}
          </Typography>
          <Stack direction="row" gap={1}>
            <ToggleButtonGroup
              color="primary"
              size="small"
              value={task.status}
              exclusive
              onChange={handleStatusChange}
            >
              <ToggleButton value={1}>To Do</ToggleButton>
              <ToggleButton value={2}>In Progress</ToggleButton>
              <ToggleButton value={3}>Done</ToggleButton>
            </ToggleButtonGroup>
            <Button
              color="primary"
              sx={{ p: 0, minWidth: 34 }}
              onClick={handleMenuOpen}
            >
              <MoreVert />
            </Button>
            <TaskMenu
              menuAnchorEl={menuAnchorEl}
              handleMenuClose={handleMenuClose}
              handleTimeMenuOpen={handleTimeModalOpen}
            />
            <Button
              startIcon={<Icon type={IconTypes.editPencil} />}
              size="small"
              onClick={() => navigate("edit")}
            >
              Edit
            </Button>
            <GoBackBtn />
          </Stack>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
          sx={{ fontWeight: 400 }}
          color="text.primary"
        >
          <Box display="inline-flex" width="130px">
            Subtitle:
          </Box>
          <b style={{ fontWeight: 500 }}>{task.subtitle}</b>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Stack gap={2}>
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              sx={{ fontWeight: 400 }}
            >
              <Box display="inline-flex" width="130px" color="text.primary">
                Type:
              </Box>
              {taskHelpers.getTypeIcon(task.type)}
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              sx={{ fontWeight: 400 }}
            >
              <Box display="inline-flex" width="130px" color="text.primary">
                Status:
              </Box>
              <Chip
                variant="outlined"
                color={taskHelpers.getStatusColor(task.status)}
                sx={{ fontWeight: 700 }}
                label={taskHelpers.getStatusText(task.status)}
              />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              sx={{ fontWeight: 400 }}
            >
              <Box display="inline-flex" width="130px" color="text.primary">
                Priority:
              </Box>
              {taskHelpers.getPriorityIcon(task.priority)}
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              sx={{ fontWeight: 400, width: "100%" }}
            >
              <Box display="inline-flex" width="130px" color="text.primary">
                Date Created:
              </Box>
              {new Date(task.createdAt).toLocaleString()}
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              sx={{ fontWeight: 400 }}
            >
              <Box display="inline-flex" width="130px" color="text.primary">
                Date Updated:
              </Box>
              {new Date(task.updatedAt).toLocaleString()}
            </Stack>
          </Stack>
          <Stack justifyContent="flex-end" gap={2} pr={2}>
            <Stack gap={3}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                gap={1}
              >
                <Typography
                  variant="body1"
                  fontWeight={400}
                  color="text.primary"
                >
                  Time Tracking:
                </Typography>
                <IconButton
                  color="primary"
                  size="small"
                  onClick={handleTimeModalOpen}
                >
                  <AddCircle />
                </IconButton>
              </Stack>
              <TaskTimeTracking data={task.time} />
            </Stack>
          </Stack>
        </Stack>
        <Stack gap={1}>
          <Typography variant="body1" fontWeight={400} color="text.primary">
            Description
          </Typography>
          <ReactQuill
            modules={{
              toolbar: false,
            }}
            className="readOnly"
            readOnly
            value={task.description}
          />
        </Stack>
        <Stack gap={2} mt={4}>
          <Typography variant="body1" fontWeight={400} color="text.primary">
            Comments
          </Typography>
          <Stack gap={5} bgcolor="secondary.main" borderRadius={"5px"} p={2}>
            {comments.length === 0 && (
              <Typography
                variant="body1"
                textAlign="center"
                fontWeight={500}
                color="text.primary"
              >
                No comments yet
              </Typography>
            )}
            {comments.map((comment, idx) => (
              <Stack gap={1} key={idx}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    color="text.primary"
                  >
                    <span className="-color_primary">
                      {`${comment.author.first_name} ${comment.author.last_name}`}{" "}
                    </span>
                    {comment.createdAt === comment.updatedAt
                      ? `added a comment ${new Date(
                          comment.createdAt
                        ).toLocaleString()}`
                      : `updated a comment ${new Date(
                          comment.updatedAt
                        ).toLocaleString()}`}
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    {comment.author.id === Number(userId) && (
                      <IconButton
                        color="primary"
                        onClick={(e) => {
                          handleCommentEdit(e, comment);
                        }}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    )}
                    <IconButton
                      color="error"
                      onClick={(e) => {
                        if (comment.id) {
                          handleCommentDelete(e, comment.id);
                        }
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Stack>
                </Stack>
                <ReactQuill
                  modules={{
                    toolbar: false,
                  }}
                  className="readOnly comments-show"
                  readOnly
                  value={comment.body}
                />
                {comments.length !== idx + 1 && <Divider />}
              </Stack>
            ))}
          </Stack>
        </Stack>
        <Stack mt="auto" gap={1}>
          {getCommentEditor()}
        </Stack>
      </Stack>
      <TaskTimeModal
        open={isTimeModalOpen}
        handleClose={handleTimeModalClose}
        remaining={task.time.remaining}
      />
    </>
  );
};

export default TaskDetails;
