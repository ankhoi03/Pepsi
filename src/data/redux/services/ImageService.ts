import {createAsyncThunk} from '@reduxjs/toolkit';
import {getDownloadURL, ref, listAll} from 'firebase/storage';
import {storage} from '@data/firebase/CloudStorage';

export const fetchImageURLs = createAsyncThunk(
  'images/fetchImageURLs',
  async () => {
    try {
      const folderRef = ref(storage, 'images');
      const imageList = await listAll(folderRef);
      const allImageURLs: Record<string, string> = {};

      await Promise.all(
        imageList.items.map(async item => {
          const imageName = item.name;
          const imageURL = await getDownloadURL(item);
          allImageURLs[imageName] = imageURL;
        }),
      );

      return allImageURLs;
    } catch (error) {
      console.error('Fetch images error: ', error);
      throw error;
    }
  },
);
