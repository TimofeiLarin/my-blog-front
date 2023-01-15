import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAuthMe } from './bi/services/auth';

import Container from '@mui/material/Container';

import { Header } from './components';

import {
  Home,
  FullPost,
  Registration,
  AddPost,
  Login,
} from './pages';

function App() {
  const authStatus = useSelector(state => state.auth.status);

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  if (authStatus === 'loading') {
    return null;
  }

  return (
    <>
      <Header />
      <Container maxWidth='lg'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/posts/:id' element={<FullPost />} />
          <Route path='/posts/:id/edit' element={<AddPost />} />
          <Route path='/new-post' element={<AddPost />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
