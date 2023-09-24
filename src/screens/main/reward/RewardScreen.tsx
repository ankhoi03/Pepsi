import {Image, StyleSheet} from 'react-native';
import React from 'react';
import {Background, Header, Button, FlexText} from '@components';
import {selectImageUrls, useAppSelector} from '@data';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootMainParamLists} from '@screens/navigation';
import {images} from '@assets';
import {colors, size} from '@utils';

type RewardScreenProps = NativeStackScreenProps<RootMainParamLists>;

const _RewardScreen: React.FC<RewardScreenProps> = props => {
  const allImages = useAppSelector(selectImageUrls);
  const {navigation} = props;
  const goHome = () => navigation.navigate('Home');
  const random = React.useMemo(() => Math.random() < 0.5, []);
  const text = [
    {
      bold: false,
      contentStyle: styles.whiteText,
      content: 'Chúc mừng bạn đã nhận được ',
    },
    {
      bold: true,
      contentStyle: styles.yellowText,
      content: random ? '1 Pepsi AN ' : '1 Mirinda PHÚC ',
    },
    {
      bold: false,
      contentStyle: styles.whiteText,
      content: 'ứng với ',
    },
    {
      bold: true,
      contentStyle: styles.yellowText,
      content: '100 coin',
    },
  ];

  return (
    <Background
      image={allImages[images.Background_Reward]}
      style={styles.background}>
      <Header iconBack={false} iconLogout={true} />
      {random ? (
        <Image source={{uri: allImages[images.pepsi_an]}} style={styles.gift} />
      ) : (
        <Image
          source={{uri: allImages[images.mirinda_phuc]}}
          style={styles.gift}
        />
      )}
      <FlexText children={text} style={styles.text} />
      <Button
        content={'Xác nhận'}
        background={allImages[images.Button_Red]}
        textStyle={styles.btnText}
        buttonStyle={styles.btnStyle}
        onPress={goHome}
      />
    </Background>
  );
};

export const RewardScreen = React.memo(_RewardScreen);

const styles = StyleSheet.create({
  background: {
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingTop: '12%',
  },
  btnText: {
    color: colors.white,
  },
  btnStyle: {
    borderColor: colors.yellow_outline,
    marginTop: 30,
  },
  gift: {
    width: size.width * 0.5,
    height: size.height * 0.5,
    resizeMode: 'contain',
    left: '5%',
  },
  whiteText: {
    color: colors.white,
  },
  yellowText: {
    color: colors.yellow_beige,
  },
  text: {
    fontSize: 18,
    width: size.width * 0.6 - 20,
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 30,
  },
});
