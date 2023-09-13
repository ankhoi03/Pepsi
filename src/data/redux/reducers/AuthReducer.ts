import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthState, CurrentUser} from '@data';

const initialState: AuthState = {
  currentUser: {
    name: '',
    phone: '',
    password: '',
  },
  isLogin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<CurrentUser>) => {
      state.currentUser = action.payload;
      state.isLogin = true;
    },
    logout: (state: AuthState) => {
      state.currentUser = initialState.currentUser;
      state.isLogin = false;
    },
  },
});

export const {login, logout} = authSlice.actions;
export const authReducer = authSlice.reducer;
