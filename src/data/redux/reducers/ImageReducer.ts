import {createSlice} from '@reduxjs/toolkit';
import {ImageState} from '@data';
import {fetchImageURLs} from '@data/redux/services/ImageService';

const initialState: ImageState = {
  imageURLs: {},
  status: 'idle',
};

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchImageURLs.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchImageURLs.fulfilled, (state, action) => {
        state.status = 'success';
        state.imageURLs = action.payload;
      });
  },
});

export const imageReducer = imagesSlice.reducer;
