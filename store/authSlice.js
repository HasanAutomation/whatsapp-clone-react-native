import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    userData: null,
    didTryAutoLogin: false,
  },
  reducers: {
    authenticate: (state, action) => {
      const { token, userData } = action.payload;
      state.token = token;
      state.userData = userData;
      state.didTryAutoLogin = true;
    },
    setDidTryAutoLogin: (state, action) => {
      state.didTryAutoLogin = true;
    },
    logout: (state, action) => {
      state.userData = null;
      state.token = null;
      state.didTryAutoLogin = false;
    },
  },
});

export const { authenticate, setDidTryAutoLogin, logout } = authSlice.actions;

export default authSlice.reducer;
