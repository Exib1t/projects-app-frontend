import React, { FC, MouseEvent, useState } from 'react';
import ReactQuill from 'react-quill';
import { quillModules } from '../../../constants';
import { Button, Stack } from '@mui/material';
import CommentProvider from '../../../services/CommentProvider';
import { getProjects } from '../../../store/reducers/projects/projectsThunk';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/global';

type Props = {
  handleCommentCancel: () => void;
};

const CommentCreate: FC<Props> = ({ handleCommentCancel }) => {
  const [comment, setComment] = useState<string>('');
  const { sorting } = useAppSelector(state => state.projects);
  const { taskId, projectId } = useParams();
  const dispatch = useAppDispatch();
  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    if (!projectId || !taskId) return null;
    await CommentProvider.createOne(projectId, taskId, comment);
    dispatch(getProjects(sorting));
    toast.success('Comment added');
    handleCommentCancel();
  };

  const handleCancel = () => {
    setComment('');
    handleCommentCancel();
  };

  return (
    <>
      <ReactQuill modules={quillModules} value={comment} onChange={val => setComment(val === '<p><br></p>' ? '' : val)} />
      <Stack direction="row" gap={1} justifyContent="flex-end">
        <Button color="primary" variant="text" onClick={handleCancel}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSubmit} sx={{ opacity: comment ? 1 : 0.7, pointerEvents: comment ? 'auto' : 'none' }}>
          Send
        </Button>
      </Stack>
    </>
  );
};

export default CommentCreate;
