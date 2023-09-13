import {View, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {
  RootStore,
  fetchImageURLs,
  selectImageStatus,
  useAppDispatch,
  useAppSelector,
} from '@data';
import {Loading} from '@components';
import {RootNavigation, SplashScreen} from '@screens';

const App: React.FC = () => {
  return (
    <Provider store={RootStore}>
      <_App />
    </Provider>
  );
};

const _App: React.FC = () => {
  const dispatch = useAppDispatch();
  const loadingImages = useAppSelector(selectImageStatus);
  useEffect(() => {
    dispatch(fetchImageURLs());
  }, [dispatch]);
  return (
    <>
      {loadingImages === 'success' ? (
        <View style={styles.container}>
          <Loading />
          <RootNavigation />
        </View>
      ) : (
        <SplashScreen />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
