import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import { fetchRegistration, isSetAuth } from '../../bi/services/auth';

import styles from './Login.module.scss';

export const Registration = () => {
  const navigate = useNavigate();

  const isAuth = useSelector(isSetAuth);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (value) => {
    const data = await dispatch(fetchRegistration(value));

    if (!data.payload) {
      return alert('Failed to registration!');
    }

    return window.localStorage.setItem(
      'tokenMyBlog',
      data.payload.token,
    );
  };

  if (isAuth) {
    return navigate('/');
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant='h5'>
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <TextField
          className={styles.field}
          label='Полное имя'
          fullWidth
          error={!!errors.fullName?.message}
          helperText={errors.fullName?.message}
          {...register('fullName', {
            required: 'Enter your full name.',
          })}
        />
        <TextField
          className={styles.field}
          label='E-Mail'
          fullWidth
          type={'email'}
          error={!!errors.email?.message}
          helperText={errors.email?.message}
          {...register('email', { required: 'Enter your email.' })}
        />
        <TextField
          className={styles.field}
          label='Пароль'
          fullWidth
          error={!!errors.password?.message}
          helperText={errors.password?.message}
          {...register('password', { required: 'Enter your email.' })}
        />
        <Button
          type='submit'
          size='large'
          variant='contained'
          fullWidth
          disabled={ !isValid }
        >
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
