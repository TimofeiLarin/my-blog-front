import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

import { instanceApi } from '../bi/api';

import { ROUTES } from '../bi/constants/routes';

import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';

export const FullPost = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const fetchPost = async () => {
    setLoading(true);
    const { data } = await instanceApi(ROUTES.PUBLICATION(id));
    setPost(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (loading) return <Post isLoading={true} isFullPost />;

  return (
    <>
      <Post
        key={post._id}
        id={post._id}
        title={post.title}
        imageUrl={
          post?.imageUrl
            ? `http://localhost:4444${post?.imageUrl}`
            : ''
        }
        user={post.user}
        createdAt={post.createdAt}
        viewsCount={post.viewsCount}
        commentsCount={3}
        tags={post.tags}
        isFullPost
      >
        <ReactMarkdown children={post.text} />
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: 'Вася Пупкин',
              avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
            },
            text: 'Это тестовый комментарий 555555',
          },
          {
            user: {
              fullName: 'Иван Иванов',
              avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
            },
            text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
