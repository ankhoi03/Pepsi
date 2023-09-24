import {ImageBackground, StyleSheet, View} from 'react-native';
import React from 'react';
import {fonts, images} from '@assets';
import {colors} from '@utils';
import {selectImageUrls, useAppSelector} from '@data';
import {RegularText} from '@components/text';

const _Coin: React.FC = () => {
  const allImages = useAppSelector(selectImageUrls);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri: allImages[images.ic_pointview]}}
        style={styles.pointview}>
        <RegularText content={'3200'} style={styles.contentStyle} />
      </ImageBackground>
      <RegularText content={'Số coin hiện tại của bạn'} style={styles.title} />
    </View>
  );
};

export const Coin = React.memo(_Coin);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  pointview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentStyle: {
    fontSize: 32,
    fontFamily: fonts.b721,
    color: colors.white,
    bottom: 5,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.b721,
    color: colors.white,
  },
});
