import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { instanceApi } from '../../api';

import { ROUTES } from '../../constants/routes';

const fetchPosts = createAsyncThunk(
  'postsAndTags/fetchPosts',
  async () => {
    const { data } = await instanceApi.get(ROUTES.PUBLICATIONS);

    return data;
  },
);

const fetchTags = createAsyncThunk(
  'postsAndTags/fetchTags',
  async () => {
    const { data } = await instanceApi.get(ROUTES.TAGS);

    return data;
  },
);

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
};

const postsAndTagsSlice = createSlice({
  name: 'postsAndTags',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = 'loading';
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = 'error';
    },
  },
});

const postsAndTagsReducer = postsAndTagsSlice.reducer;

export { postsAndTagsReducer, fetchPosts, fetchTags };
