import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: {
    items: [],
    status: 'loading'
  },
  tags: {
    items: [],
    status: 'loading'
  },
};

const postsAndTagsSlice = createSlice({
  name: 'postsAndTags',
  initialState,
  reducers: {},
});

const postsAndTagsReducer =  postsAndTagsSlice.reducer;

export { postsAndTagsReducer };
