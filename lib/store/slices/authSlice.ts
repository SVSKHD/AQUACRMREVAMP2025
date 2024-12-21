import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, LoginResponse } from '@/lib/types/auth';

// Check for existing token on initialization
const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

const initialState: AuthState = { 
  token: null,
  user: null,
  isAuthenticated: !!token,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<LoginResponse>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('token');
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;