import {RootState} from '@data';

export const selectLoading = (state: RootState) => state.loading;

export const selectLoadingStatus = (state: RootState) =>
  state.loading.enableLoading;
