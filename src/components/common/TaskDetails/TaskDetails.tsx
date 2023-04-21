import React, { MouseEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/global';
import { Box, Button, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material';
import Icon from '../Icon/Icon';
import { IconTypes, quillModules } from '../../../constants';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import GoBackBtn from '../../controls/GoBackBtn/GoBackBtn';
import { taskHelpers } from '../../../helpers/taskHelpers';
import { Delete, MoreVert } from '@mui/icons-material';
import TaskMenu from './parts/TaskMenu';
import { getProjects } from '../../../store/reducers/projects/projectsThunk';
import { toast } from 'react-toastify';
import CommentProvider from '../../../services/CommentProvider';

const TaskDetails = () => {
  const { taskId, projectId } = useParams();
  const { projects, sorting } = useAppSelector(state => state.projects);
  const project = projects.filter(project => String(project.id) === projectId)[0];
  const task = project?.tasks.filter(task => String(task.id) === taskId)[0];
  const [newComment, setNewComment] = useState<string>('');
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleCommentSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    if (!projectId || !taskId) return null;
    await CommentProvider.createOne(projectId, taskId, newComment);
    dispatch(getProjects(sorting));
    toast.success('Comment added');
    setNewComment('');
  };

  const handleCommentDelete = async (e: MouseEvent<HTMLButtonElement>, commentId: number) => {
    if (!projectId || !taskId) return null;
    await CommentProvider.deleteOne(projectId, taskId, commentId);
    dispatch(getProjects(sorting));
    toast.error('Comment deleted');
  };

  if (!task) return null;
  return (
    <Stack
      sx={{
        width: '100%',
        minHeight: 'calc(100vh - 100px)',
        border: `2px solid ${theme.palette.secondary.dark}`,
        borderRadius: '5px',
        background: theme.palette.secondary.dark,
        p: 2,
        gap: 2,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="body1" color="primary.main">
          {project.title} / {task.title}
        </Typography>
        <Stack direction="row" gap={1}>
          <Button color="primary" sx={{ p: 0, minWidth: 34 }} onClick={handleMenuOpen}>
            <MoreVert />
          </Button>
          <TaskMenu menuAnchorEl={menuAnchorEl} handleMenuClose={handleMenuClose} />
          <Button startIcon={<Icon type={IconTypes.editPencil} />} size="small" onClick={() => navigate('edit')}>
            Edit
          </Button>
          <GoBackBtn />
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center" gap={1} sx={{ fontWeight: 400 }} color="text.primary">
        <Box display="inline-flex" width="100px">
          Subtitle:
        </Box>{' '}
        <b style={{ fontWeight: 500 }}>{task.subtitle}</b>
      </Stack>
      <Stack direction="row" alignItems="center" gap={1} sx={{ fontWeight: 400 }}>
        <Box display="inline-flex" width="100px" color="text.primary">
          Type:
        </Box>{' '}
        {taskHelpers.getTypeIcon(task.type)}
      </Stack>
      <Stack direction="row" alignItems="center" gap={1} sx={{ fontWeight: 400 }}>
        <Box display="inline-flex" width="100px" color="text.primary">
          Priority:
        </Box>{' '}
        {taskHelpers.getPriorityIcon(task.priority)}
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
        <Stack gap={5} bgcolor="secondary.main" borderRadius={'5px'} p={2}>
          {task.comments.length === 0 && (
            <Typography variant="body1" textAlign="center" fontWeight={500} color="text.primary">
              No comments yet
            </Typography>
          )}
          {task.comments.map((comment, idx) => (
            <Stack gap={1} position="relative">
              <Typography variant="body2" fontWeight={700} color="text.primary">
                {comment.author}
              </Typography>
              <ReactQuill
                modules={{
                  toolbar: false,
                }}
                className="readOnly comments-show"
                readOnly
                value={comment.body}
              />
              <IconButton
                color="error"
                onClick={e => {
                  if (comment.id) {
                    handleCommentDelete(e, comment.id);
                  }
                }}
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
              {task.comments.length !== idx + 1 && <Divider />}
            </Stack>
          ))}
        </Stack>
      </Stack>
      <Stack mt="auto" gap={1}>
        <ReactQuill modules={quillModules} value={newComment} onChange={val => setNewComment(val === '<p><br></p>' ? '' : val)} />
        <Button
          color="primary"
          onClick={handleCommentSubmit}
          sx={{ width: 'max-content', marginLeft: 'auto', opacity: newComment ? 1 : 0.7, pointerEvents: newComment ? 'auto' : 'none' }}
        >
          Send
        </Button>
      </Stack>
    </Stack>
  );
};

export default TaskDetails;
