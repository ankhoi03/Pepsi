import {configureStore} from '@reduxjs/toolkit';
import {useDispatch, TypedUseSelectorHook, useSelector} from 'react-redux';
import {authReducer, loadingReducer, imageReducer} from '@data/redux/reducers';

const _RootStore = configureStore({
  reducer: {
    image: imageReducer,
    loading: loadingReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof _RootStore.getState>;
export type AppDispatch = typeof _RootStore.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const RootStore = _RootStore;
