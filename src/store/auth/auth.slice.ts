import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: number;
  email: string;
  username: string;
  image?: string;
}

type Theme = 'light' | 'dark';

interface AuthState {
  user: User | null;
  token: string | null;
  theme: Theme;
}

const initialState: AuthState = { user: null, token: null, theme: 'dark' };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    }
  }
});

export const { setUser, setToken, logout, setTheme } = authSlice.actions;
export default authSlice.reducer;
