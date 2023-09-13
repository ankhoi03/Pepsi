import {StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {Background, ButtonV2, Header, RegularText, Button} from '@components';
import {selectImageUrls, useAppSelector} from '@data';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootMainParamLists} from '@screens/navigation';
import {fonts, images} from '@assets';
import {colors, size} from '@utils';

type HomeScreenProps = NativeStackScreenProps<RootMainParamLists>;

const _HomeScreen: React.FC<HomeScreenProps> = () => {
  const allImages = useAppSelector(selectImageUrls);
  return (
    <Background
      image={allImages[images.Background_Home]}
      style={styles.background}>
      <Header iconBack={false} iconLogout={true} />
      <Pressable>
        <RegularText content={'Hướng dẫn'} style={styles.helpText} />
      </Pressable>
      <ButtonV2
        content="Chơi ngay"
        background={allImages[images.Button_Home]}
        numOfTurn={8}
      />
      <Button
        content={'Quét mã'}
        background={allImages[images.Button_White]}
        textStyle={styles.btnText}
        buttonStyle={styles.btnStyle}
      />
      <Button
        content={'Bộ sưu tập'}
        background={allImages[images.Button_White]}
        textStyle={styles.btnText}
        buttonStyle={styles.btnStyle}
      />
      <Button
        content={'Chi tiết quà tặng'}
        background={allImages[images.Button_White]}
        textStyle={styles.btnText}
        buttonStyle={styles.btnStyle}
      />
    </Background>
  );
};

export const HomeScreen = React.memo(_HomeScreen);

const styles = StyleSheet.create({
  background: {
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingTop: 36,
    gap: 16,
  },
  helpText: {
    color: colors.yellow_beige,
    fontSize: 20,
    fontFamily: fonts.b721,
    marginTop: size.height * 0.4 - 16,
  },
  btnText: {
    color: colors.blue_pepsi,
  },
  btnStyle: {
    borderColor: colors.yellow_outline,
  },
});
