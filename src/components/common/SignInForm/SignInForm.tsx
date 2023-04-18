import React, { FC } from 'react';
import { Box, Button, Checkbox, InputLabel, Stack, TextField, Typography, useTheme } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuth } from '../../../services/authProvider';
import { useAppSelector } from '../../../hooks/global';

type Props = {};

interface IFormState {
  email: string;
  password: string;
  isRemember: boolean;
}

const SignInForm: FC<Props> = () => {
  const theme = useTheme();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<IFormState>();
  const { error } = useAppSelector(state => state.global);
  const { login } = useAuth();
  const onSubmit: SubmitHandler<IFormState> = data => {
    login(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        backgroundColor: theme.palette.secondary.dark,
        padding: 2,
        width: '100%',
        maxWidth: '500px',
        borderRadius: '5px',
        boxShadow: '0 0 20px 2px rgba(0, 0, 0, 0.5)',
      }}
    >
      <Typography variant="h2" color={theme.palette.text.primary} textAlign="center" marginBottom={3}>
        Sign In
      </Typography>
      <Stack gap={1} marginBottom={2}>
        <Stack width="100%" gap={0}>
          <TextField label="Email" placeholder="youremail@test.com" fullWidth {...register('email', { required: true, minLength: 6 })} />
          {errors.email && (
            <Typography variant="body2" color="red">
              This field is required
            </Typography>
          )}
        </Stack>
        <Stack gap={1} marginBottom={2}>
          <TextField label="Password" placeholder="12345678" type="password" fullWidth {...register('password', { required: true, minLength: 6 })} />
          {errors.password && (
            <Typography variant="body2" color="red">
              This field is required
            </Typography>
          )}
        </Stack>
        <InputLabel sx={{ width: 'max-content', cursor: 'pointer' }}>
          <Checkbox {...register('isRemember')} />
          Remember me?
        </InputLabel>
      </Stack>
      <Button type="submit" fullWidth sx={{ fontSize: 16, fontWeight: 900 }}>
        Login
      </Button>
      {error && (
        <Typography variant="body2" fontSize="14px" color="red" marginTop={2}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default SignInForm;
