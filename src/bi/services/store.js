import { configureStore } from "@reduxjs/toolkit";

import { postsAndTagsReducer } from "./posts";



const store = configureStore({
  reducer: {
    postsAndTags: postsAndTagsReducer,
  }
});

export { store };