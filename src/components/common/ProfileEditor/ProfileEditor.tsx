import React, { useEffect, useState } from 'react';
import { Backdrop, Box, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUser } from '../../../hooks/user/useUser';
import { useAppSelector } from '../../../hooks/global';

interface IFormState {
  email: string;
  first_name: string;
  last_name: string;
}

const ProfileEditor = () => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const { userId } = useAppSelector(state => state.user);
  const { data, saveUser, refresh } = useUser(userId);

  const { handleSubmit, register, setValue } = useForm<IFormState>();

  const handleEdit = (e: any) => {
    e.preventDefault();
    setIsEditable(true);
  };

  const handleSave: SubmitHandler<IFormState> = async updatedData => {
    if (!data) return null;
    const response = await saveUser({ ...updatedData, id: data.id });
    setIsEditable(false);
  };

  const handleCancel = () => {
    refresh();
    setIsEditable(false);
  };

  useEffect(() => {
    if (data?.first_name && data?.last_name && data.email) {
      setValue('first_name', data?.first_name);
      setValue('last_name', data.last_name);
      setValue('email', data.email);
    }
  }, [data]);

  if (!data) {
    return (
      <Backdrop open={true}>
        <CircularProgress size="30" color="primary" />
      </Backdrop>
    );
  }

  return (
    <Stack width="100%" alignItems="center" py={4}>
      <Box
        component="form"
        onSubmit={handleSubmit(handleSave)}
        sx={{
          backgroundColor: 'secondary.dark',
          padding: 3,
          pb: '30px',
          width: '100%',
          maxWidth: '800px',
          borderRadius: '5px',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h5" textAlign="center" color="text.primary" fontWeight={500}>
          My Account
        </Typography>
        <TextField label="First Name" fullWidth {...register('first_name', { required: true })} disabled={!isEditable} />
        <TextField label="Last Name" fullWidth {...register('last_name', { required: true })} disabled={!isEditable} />
        <TextField label="Email" fullWidth {...register('email', { required: true })} disabled={!isEditable} />
        <Stack width="100%" gap={1} direction="row" mt={4}>
          {isEditable ? (
            <>
              <Button sx={{ flex: 1, px: 5, fontWeight: 900, fontSize: 16 }} type="submit">
                Save
              </Button>
              <Button variant="outlined" sx={{ flex: 1, fontWeight: 900, fontSize: 16 }} onClick={handleCancel} type="button">
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="outlined" sx={{ flex: 1, fontWeight: 900, fontSize: 16 }} onClick={handleEdit} type="button">
              Edit
            </Button>
          )}
        </Stack>
      </Box>
    </Stack>
  );
};

export default ProfileEditor;
