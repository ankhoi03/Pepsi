import {StyleSheet, ActivityIndicator, View, StatusBar} from 'react-native';
import React from 'react';
import {colors} from '@utils';
import {fonts} from '@assets';
import {RegularText} from '@components';

const _SplashScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <ActivityIndicator size={65} color={colors.blue_01} />
      <RegularText style={styles.loadingText} content="Pepsi Tết" />
    </View>
  );
};

export const SplashScreen = React.memo(_SplashScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.white,
  },
  loadingText: {
    fontSize: 30,
    fontFamily: fonts.b721,
    color: colors.blue_01,
  },
});
