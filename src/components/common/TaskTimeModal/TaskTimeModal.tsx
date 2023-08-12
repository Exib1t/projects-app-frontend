import React, { FC } from "react";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks/global";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { updateTaskLogTime } from "../../../store/reducers/tasks/tasksThunk";
import { setError } from "../../../store/reducers/globalSlicer";
import { AxiosError } from "axios";

type Props = {
  open: boolean;
  handleClose: () => void;
  remaining: number;
};

interface IFormState {
  timeLogged: string;
}

const TaskTimeModal: FC<Props> = ({ open, handleClose, remaining }) => {
  const { projectId, taskId } = useParams();
  const { sorting } = useAppSelector((state) => state.tasks);
  const { error } = useAppSelector((state) => state.global);
  const dispatch = useAppDispatch();
  const { handleSubmit, register, reset } = useForm<IFormState>();

  const onSubmit: SubmitHandler<IFormState> = async (data) => {
    if (projectId && taskId) {
      try {
        dispatch(setError(null));
        await dispatch(
          updateTaskLogTime({
            taskId,
            projectId,
            timeLogged: data.timeLogged,
            remaining,
          })
        );
        handleClose();
        reset();
      } catch (err: AxiosError | any) {
        dispatch(setError(err.response.data.msg));
      }
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Stack
        gap={4}
        bgcolor="secondary.main"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "secondary.main",
          borderRadius: 1,
          p: 2,
          pb: 4,
        }}
      >
        <Typography variant="h6" color="text.primary" textAlign="center">
          Time Manage
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography variant="body1" color="text.primary" textAlign="center">
              Time Spent:
            </Typography>
            <TextField
              placeholder="1.5h"
              size="small"
              sx={{ width: 100 }}
              onFocus={() => {
                dispatch(setError(null));
              }}
              {...register("timeLogged", { required: true })}
            />
          </Stack>
          <Typography variant="body2" fontSize="14px" color="red" marginTop={2}>
            {error}
          </Typography>
          <Stack direction="row" justifyContent="flex-end" gap={1} mt={3}>
            <Button variant="text" size="small" onClick={handleClose}>
              Cancel
            </Button>
            <Button size="small" type="submit">
              Log
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Modal>
  );
};

export default TaskTimeModal;
