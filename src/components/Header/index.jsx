import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import styles from './Header.module.scss';

export const Header = () => {
  const isAuth = false;

  const onClickLogout = () => {};

  return (
    <div className={styles.root}>
      <Container maxWidth='lg'>
        <div className={styles.inner}>
          <Link className={styles.logo} to='/'>
            <div>MY PERSONAL BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to='/new-post'>
                  <Button variant='contained'>Написать статью</Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  variant='contained'
                  color='error'
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to='/login'>
                  <Button variant='outlined'>Войти</Button>
                </Link>
                <Link to='/registration'>
                  <Button variant='contained'>Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
