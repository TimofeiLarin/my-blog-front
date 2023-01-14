import { configureStore } from "@reduxjs/toolkit";

import { postsAndTagsReducer } from "./posts";
import { authReducer } from "./auth";



const store = configureStore({
  reducer: {
    postsAndTags: postsAndTagsReducer,
    auth: authReducer,
  }
});

export { store };