import React, { FC, MouseEvent, useState } from "react";
import ReactQuill from "react-quill";
import { Button, Stack } from "@mui/material";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/global";
import { getProjects } from "../../../store/reducers/projects/projectsThunk";
import { quillModules } from "../../../constants";
import { IProjectTaskComment } from "../../../models";
import { getTasks } from "../../../store/reducers/tasks/tasksThunk";
import {
  getComments,
  updateComment,
} from "../../../store/reducers/comments/commentsThunk";

type Props = {
  handleCommentCancel: () => void;
  data: IProjectTaskComment;
};

const CommentEdit: FC<Props> = ({ handleCommentCancel, data }) => {
  const [comment, setComment] = useState<IProjectTaskComment>(data);
  const { sorting } = useAppSelector((state) => state.projects);
  const { taskId, projectId } = useParams();
  const dispatch = useAppDispatch();
  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    if (!projectId || !taskId) return null;
    await dispatch(updateComment({ comment, taskId, projectId }));
    await dispatch(getProjects(sorting));
    await dispatch(getTasks({ projectId }));
    await dispatch(getComments({ projectId, taskId }));
    toast.success("Comment added");
    handleCommentCancel();
  };

  const handleCancel = () => {
    handleCommentCancel();
  };

  return (
    <>
      <ReactQuill
        modules={quillModules}
        value={comment.body}
        onChange={(val) =>
          setComment((prevState) => ({
            ...prevState,
            body: val === "<p><br></p>" ? "" : val,
          }))
        }
      />
      <Stack direction="row" gap={1} justifyContent="flex-end">
        <Button color="primary" variant="text" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={handleSubmit}
          sx={{
            opacity: comment ? 1 : 0.7,
            pointerEvents: comment ? "auto" : "none",
          }}
        >
          Save
        </Button>
      </Stack>
    </>
  );
};

export default CommentEdit;
