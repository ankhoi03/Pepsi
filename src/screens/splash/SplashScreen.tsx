import {
  StyleSheet,
  ActivityIndicator,
  Image,
  View,
  StatusBar,
} from 'react-native';
import React from 'react';
import {colors} from '@utils';

const _SplashScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <ActivityIndicator size={60} color={colors.logo} />
      <Image source={require('@assets/images/logo.png')} style={styles.logo} />
    </View>
  );
};

export const SplashScreen = React.memo(_SplashScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  logo: {
    width: 180,
    height: 60,
    resizeMode: 'contain',
  },
});
