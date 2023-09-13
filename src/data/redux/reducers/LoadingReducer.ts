import {LoadingState} from '@data';
import {createSlice} from '@reduxjs/toolkit';

const initialState: LoadingState = {
  enableLoading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    enableLoading: state => {
      state.enableLoading = true;
    },
    disableLoading: state => {
      state.enableLoading = false;
    },
  },
});

export const {enableLoading, disableLoading} = loadingSlice.actions;
export const loadingReducer = loadingSlice.reducer;
