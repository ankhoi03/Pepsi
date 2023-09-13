import {createSelector} from 'reselect';
import {RootState} from '@data/redux/store';
import {AuthState} from '@data/redux/types';

export const selectAuthSlice = (state: RootState) => state.auth;

export const selectCurrentUser = createSelector(
  selectAuthSlice,
  (authSlice: AuthState) => authSlice.currentUser,
);

export const selectIsLoggedIn = createSelector(
  selectAuthSlice,
  (authSlice: AuthState) => authSlice.isLogin,
);
