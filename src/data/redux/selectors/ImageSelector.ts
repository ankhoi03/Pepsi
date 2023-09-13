import {createSelector} from 'reselect';
import {RootState} from '@data/redux/store';
import {ImageState} from '@data/redux/types';

export const selectImageSlice = (state: RootState) => state.image;

export const selectImageUrls = createSelector(
  selectImageSlice,
  (imageSlice: ImageState) => imageSlice.imageURLs,
);

export const selectImageStatus = createSelector(
  selectImageSlice,
  (imageSlice: ImageState) => imageSlice.status,
);
