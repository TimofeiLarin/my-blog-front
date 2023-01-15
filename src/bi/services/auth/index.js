import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { instanceApi } from '../../api';

import { ROUTES } from '../../constants/routes';

const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (params) => {
    const { data } = await instanceApi.post(ROUTES.LOGIN, params);

    return data;
  },
);

const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  const { data } = await instanceApi.get(ROUTES.GET_AUTH_ME);

  return data;
});

const fetchRegistration = createAsyncThunk(
  'auth/fetchRegistration',
  async (params) => {
    const { data } = await instanceApi.post(ROUTES.REGISTER, params);

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
    [fetchLogin.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchLogin.rejected]: (state) => {
      state.data = null;
      state.status = 'error';
    },

    [fetchAuthMe.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchAuthMe.rejected]: (state) => {
      state.data = null;
      state.status = 'error';
    },

    [fetchRegistration.pending]: (state) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchRegistration.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchRegistration.rejected]: (state) => {
      state.data = null;
      state.status = 'error';
    },
  },
});

const isSetAuth = (state) => !!state.auth.data;

const authReducer = authSlice.reducer;

const { logout } = authSlice.actions;

export {
  authReducer,
  isSetAuth,
  fetchLogin,
  fetchRegistration,
  fetchAuthMe,
  logout,
};
