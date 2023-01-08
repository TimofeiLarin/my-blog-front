import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { fetchPosts, fetchTags } from '../bi/services/posts';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector((state) => state.postsAndTags);

  const isLoadingPost = posts.status === 'loading';
  const isLoadingTags = tags.status === 'loading';

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label='basic tabs example'
      >
        <Tab label='Новые' />
        <Tab label='Популярные' />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isLoadingPost ? [...Array(5)] : posts.items).map(
            (item, index) =>
              isLoadingPost ? (
                <Post key={index} isLoading={isLoadingPost} />
              ) : (
                <Post
                  key={item._id}
                  id={item._id}
                  title={item.title}
                  imageUrl={item?.imageUrl}
                  user={item.user}
                  createdAt={item.createdAt}
                  viewsCount={item.viewsCount}
                  commentsCount={3}
                  tags={item.tags}
                  isEditable
                  isLoading={isLoadingPost}
                />
              ),
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock
            key='tagsBlock'
            items={tags.items}
            isLoading={isLoadingTags}
          />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl:
                    'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl:
                    'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
