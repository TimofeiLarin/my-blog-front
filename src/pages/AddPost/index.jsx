import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import SimpleMDE from 'react-simplemde-editor';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import { isSetAuth } from '../../bi/services/auth';

import { instanceApi } from '../../bi/api';

import { ROUTES } from '../../bi/constants/routes';

import { PostSkeleton } from '../../components/Post/Skeleton';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';

export const AddPost = () => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const inputFileRef = useRef(null);

  const isAuth = useSelector(isSetAuth);

  const navigate = useNavigate();
  const { id: postId } = useParams();

  const textButtonSave = postId ? 'Save' : 'Publish';

  const getParams = async () => {
    try {
      setLoading(true);

      const { data } = await instanceApi.get(
        ROUTES.PUBLICATION(postId),
      );

      setText(data.text);
      setTitle(data.title);
      setTags(data.tags.join(', '));
      setImageUrl(data.imageUrl);

      setLoading(false);
    } catch (error) {
      console.warn('error upload image', error);

      alert('Error loading image!');
    }
  };

  useEffect(() => {
    if (postId) {
      getParams();
    }
  }, []);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];

      formData.append('image', file);

      const { data } = await instanceApi.post(
        ROUTES.UPLOAD,
        formData,
      );

      setImageUrl(data.url);
    } catch (error) {
      console.warn('error upload image', error);

      alert('Error loading image!');
    }
  };

  const onClickRemoveImage = () => setImageUrl('');

  const onChange = useCallback((value) => {
    setText(value);
  }, []);

  const requestWithSelectedRoute = async (params) => {
    if (postId) {
      await instanceApi.patch(ROUTES.PUBLICATION(postId), params);

      return postId;
    }

    const {
      data: { _id },
    } = await instanceApi.post(ROUTES.PUBLICATIONS, params);

    return _id;
  };

  const onSubmit = async () => {
    try {
      setLoading(true);

      const params = {
        text,
        title,
        tags: tags.split(', '),
        imageUrl,
      };

      const id = await requestWithSelectedRoute(params);

      setLoading(false);

      navigate(`/posts/${id}`);
    } catch (error) {
      console.warn('error upload image', error);

      alert('Failed create posts!');
    }
  };

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if (!isAuth) {
    return <Navigate to='/' />;
  }

  if (loading) {
    return <PostSkeleton />;
  }

  return (
    <Paper style={{ padding: 30 }} loading>
      {!imageUrl && (
        <>
          <Button
            variant='outlined'
            size='large'
            onClick={() => inputFileRef.current.click()}
          >
            Загрузить превью
          </Button>
          <input
            type='file'
            ref={inputFileRef}
            hidden
            onChange={handleChangeFile}
          />
        </>
      )}
      {imageUrl && (
        <>
          <Button
            variant='contained'
            color='error'
            onClick={onClickRemoveImage}
          >
            Удалить
          </Button>
          <img
            className={styles.image}
            src={`http://localhost:4444${imageUrl}`}
            alt='Uploaded'
          />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant='standard'
        placeholder='Заголовок статьи...'
        fullWidth
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <TextField
        classes={{ root: styles.tags }}
        variant='standard'
        placeholder='Тэги'
        fullWidth
        value={tags}
        onChange={(event) => setTags(event.target.value)}
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size='large' variant='contained'>
          {textButtonSave}
        </Button>
        <a href='/'>
          <Button size='large'>Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
