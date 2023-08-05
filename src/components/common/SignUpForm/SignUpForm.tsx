import React, { FC } from "react";
import {
  Box,
  Button,
  Checkbox,
  InputLabel,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../../services/authProvider";
import { useAppSelector } from "../../../hooks/global";

type Props = {};

interface IFormState {
  email: string;
  password: string;
  c_password: string;
  isPrivacyAccepted: boolean;
  first_name: string;
  last_name: string;
}

const SignUpForm: FC<Props> = () => {
  const { theme: themeMode } = useAppSelector((state) => state.global);
  const theme = useTheme();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<IFormState>();
  const { createUser } = useAuth();
  const { error } = useAppSelector((state) => state.global);

  const onSubmit: SubmitHandler<IFormState> = (data) => {
    createUser(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        backgroundColor: theme.palette.secondary.dark,
        padding: 2,
        width: "100%",
        maxWidth: "500px",
        borderRadius: "5px",
        boxShadow: `0 0 20px 2px ${
          themeMode === "dark"
            ? "rgba(0, 0, 0, 0.5)"
            : "rgba(255, 255, 255, 0.5)"
        }`,
      }}
    >
      <Typography
        variant="h2"
        color={theme.palette.text.primary}
        textAlign="center"
        marginBottom={3}
      >
        Sign Up
      </Typography>
      <Stack gap={1} marginBottom={2}>
        <Stack direction="row" gap={1}>
          <Stack width=" 100%" gap={0}>
            <TextField
              label="First Name*"
              placeholder="John"
              fullWidth
              {...register("first_name", { required: true, minLength: 2 })}
            />
            {errors.first_name && (
              <Typography variant="body2" color="red">
                This field is required
              </Typography>
            )}
          </Stack>
          <Stack width=" 100%" gap={0}>
            <TextField
              label="Last Name*"
              placeholder="Doe"
              fullWidth
              {...register("last_name", { required: true, minLength: 2 })}
            />
            {errors.last_name && (
              <Typography variant="body2" color="red">
                This field is required
              </Typography>
            )}
          </Stack>
        </Stack>
        <Stack width=" 100%" gap={0}>
          <TextField
            label="Email*"
            placeholder="youremail@test.com"
            fullWidth
            {...register("email", { required: true, minLength: 6 })}
          />
          {errors.email && (
            <Typography variant="body2" color="red">
              This field is required
            </Typography>
          )}
        </Stack>
        <Stack direction="row" gap={1}>
          <Stack width="100%" gap={0}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password && (
              <Typography variant="body2" color="red">
                This field is required
              </Typography>
            )}
          </Stack>
          <Stack width="100%" gap={0}>
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              {...register("c_password", {
                required: true,
                minLength: 6,
                validate: (val: string) => {
                  if (watch("password") != val) {
                    return "Your passwords do no match";
                  }
                },
              })}
            />
            {errors.c_password && (
              <Typography variant="body2" color="red">
                {errors.c_password.message
                  ? errors.c_password.message
                  : "This field is required"}
              </Typography>
            )}
          </Stack>
        </Stack>
        <Stack width="100%" gap={0}>
          <InputLabel sx={{ width: "max-content", cursor: "pointer" }}>
            <Checkbox {...register("isPrivacyAccepted", { required: true })} />
            Do you accept privacy policy?
          </InputLabel>
          {errors.isPrivacyAccepted && (
            <Typography variant="body2" color="red">
              You need to accept the privacy policy
            </Typography>
          )}
        </Stack>
      </Stack>
      <Button type="submit" fullWidth sx={{ fontSize: 16, fontWeight: 900 }}>
        Register
      </Button>
      {error && (
        <Typography variant="body2" fontSize="14px" color="red" marginTop={2}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default SignUpForm;
