import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { fetchLogin, isSetAuth } from '../../bi/services/auth';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import styles from './Login.module.scss';

export const Login = () => {
  const navigate = useNavigate();

  const isAuth = useSelector(isSetAuth);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (value) => {
    const data = await dispatch(fetchLogin(value));

    if (!data.payload) {
      return alert('Failed to login!');
    }

    console.log(data.payload);

    return window.localStorage.setItem('tokenMyBlog', data.payload.token)
  };

  if (isAuth) {
    return navigate('/');
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant='h5'>
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label='E-Mail'
          error={!!errors.email?.message}
          helperText={errors.email?.message}
          fullWidth
          type='email'
          {...register('email', { required: 'Укажите почту' })}
        />
        <TextField
          className={styles.field}
          label='Пароль'
          fullWidth
          error={!!errors.password?.message}
          helperText={errors.password?.message}
          {...register('password', { required: 'Укажите пароль' })}
        />
        <Button
          type='submit'
          size='large'
          variant='contained'
          fullWidth
          disabled={ !isValid }
        >
          Войти
        </Button>
      </form>
    </Paper>
  );
};
