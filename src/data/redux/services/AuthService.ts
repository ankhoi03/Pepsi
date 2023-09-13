import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  addDoc,
} from 'firebase/firestore';
import {CurrentUser} from '@data/redux/types/AuthType';
import {AppDispatch} from '@data/redux/store';
import {app} from '@data/firebase/Config';
import {enableLoading, disableLoading, login} from '@data/redux/reducers';

const firestore = getFirestore(app);

export const performLogin = createAsyncThunk<
  void,
  {phone: string; password: string},
  {dispatch: AppDispatch}
>('auth/performLogin', async (_, {dispatch}) => {
  dispatch(enableLoading());
  try {
    const _query = query(
      collection(firestore, 'users'),
      where('phone', '==', _.phone),
    );
    const querySnapshot = await getDocs(_query);
    if (querySnapshot.empty) {
      throw new Error('User not found');
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    if (userData.password !== _.password) {
      throw new Error('Invalid password');
    }

    const currentUser: CurrentUser = {
      name: userData.name,
      phone: userData.phone,
      password: userData.password,
    };

    dispatch(login(currentUser));
  } catch (error) {
    console.error('Login error: ', error);
    throw error;
  } finally {
    dispatch(disableLoading());
  }
});

export const performRegister = createAsyncThunk<
  void,
  {name: string; phone: string; password: string},
  {dispatch: AppDispatch}
>('auth/performRegister', async (_, {dispatch}) => {
  dispatch(enableLoading());
  try {
    const existingUserQuery = await getDocs(
      query(collection(firestore, 'users'), where('phone', '==', _.phone)),
    );

    if (!existingUserQuery.empty) {
      throw new Error('User with this phone number already exists');
    }

    const newUser = {
      name: _.name,
      phone: _.phone,
      password: _.password,
    };

    const docRef = await addDoc(collection(firestore, 'users'), newUser);

    if (!docRef) {
      throw new Error('Error creating user');
    }
    dispatch(login(newUser));
  } catch (error) {
    console.error('Registration error: ', error);
    throw error;
  } finally {
    dispatch(disableLoading());
  }
});
