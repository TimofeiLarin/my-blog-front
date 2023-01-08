import { Routes, Route } from 'react-router-dom';
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
  return (
    <>
      <Header />
      <Container maxWidth='lg'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/posts/:id' element={<FullPost />} />
          <Route path='/new-post' element={<AddPost />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
