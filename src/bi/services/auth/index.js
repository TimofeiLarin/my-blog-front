import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { instanceApi } from '../../api';

import { ROUTES } from '../../constants/routes';

const fetchAuth = createAsyncThunk(
  'auth/fetchAuth',
  async (params) => {
    const data = await instanceApi.post(ROUTES.LOGIN, params);

    return data;
  },
);

const initialState = {
  data: null,
  status: 'loading',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchAuth.rejected]: (state) => {
      state.data = null;
      state.status = 'error';
    },
  },
});

const isSetAuth = (state) => !!state.auth.data;

const authReducer = authSlice.reducer;

const { logout } = authSlice.actions;

export { authReducer, fetchAuth, isSetAuth, logout };
