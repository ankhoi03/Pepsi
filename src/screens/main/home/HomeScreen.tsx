import {
  StyleSheet,
  Pressable,
  StatusBar,
  ImageBackground,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Background, ButtonV2, Header, RegularText, Button} from '@components';
import {selectImageUrls, useAppSelector} from '@data';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootMainParamLists} from '@screens/navigation';
import {fonts, images} from '@assets';
import {colors, size} from '@utils';
import Modal from 'react-native-modal';

type HomeScreenProps = NativeStackScreenProps<RootMainParamLists>;

const _HomeScreen: React.FC<HomeScreenProps> = props => {
  const allImages = useAppSelector(selectImageUrls);
  const [isShow, setIsShow] = useState(false);
  const {navigation} = props;
  const onPlay = (_type: boolean) => {
    setIsShow(false);
    navigation.navigate('Game', {type: _type});
  };
  const goToGuide = () => navigation.navigate('Guide');
  const goToScan = () => navigation.navigate('Scan');
  const goToCollection = () => navigation.navigate('Collection');
  const goToGift = () => navigation.navigate('Gift');

  const DialogPlay: React.FC = () => {
    return (
      <>
        {isShow ? (
          <View style={styles.show}>
            <StatusBar
              translucent
              backgroundColor={'rgba(0, 0, 0, 0.4)'}
              barStyle={'light-content'}
            />
            <Modal
              isVisible={true}
              style={styles.modal}
              backdropOpacity={0.4}
              onBackdropPress={() => setIsShow(false)}>
              <ImageBackground
                style={styles.dialog}
                source={{uri: allImages[images.popup_turn_to_play]}}>
                <TouchableOpacity
                  style={styles.btnClose}
                  onPress={() => setIsShow(false)}>
                  <Image
                    source={{uri: allImages[images.ic_close]}}
                    style={styles.iconClose}
                  />
                </TouchableOpacity>
                <RegularText
                  content={'BẠN MUỐN SỬ DỤNG LƯỢT CHƠI NÀO?'}
                  style={styles.confirmText}
                />
                <ButtonV2
                  content="Lượt chơi miễn phí"
                  background={allImages[images.Button_Turn_to_play]}
                  numOfTurn={3}
                  onPress={() => onPlay(true)}
                />
                <ButtonV2
                  content="Lượt chơi quy đổi"
                  background={allImages[images.Button_Turn_to_play]}
                  numOfTurn={5}
                  onPress={() => onPlay(false)}
                />
              </ImageBackground>
            </Modal>
          </View>
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    <Background
      image={allImages[images.Background_Home]}
      style={styles.background}>
      <Header iconBack={false} iconLogout={true} />
      <Pressable onPress={goToGuide}>
        <RegularText content={'Hướng dẫn'} style={styles.helpText} />
      </Pressable>
      <ButtonV2
        content="Chơi ngay"
        background={allImages[images.Button_Home]}
        numOfTurn={8}
        onPress={() => setIsShow(true)}
      />
      <Button
        content={'Quét mã'}
        background={allImages[images.Button_White]}
        textStyle={styles.btnText}
        buttonStyle={styles.btnStyle}
        onPress={goToScan}
      />
      <Button
        content={'Bộ sưu tập'}
        background={allImages[images.Button_White]}
        textStyle={styles.btnText}
        buttonStyle={styles.btnStyle}
        onPress={goToCollection}
      />
      <Button
        content={'Chi tiết quà tặng'}
        background={allImages[images.Button_White]}
        textStyle={styles.btnText}
        buttonStyle={styles.btnStyle}
        onPress={goToGift}
      />
      <DialogPlay />
    </Background>
  );
};

export const HomeScreen = React.memo(_HomeScreen);

const styles = StyleSheet.create({
  background: {
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingTop: '12%',
    gap: 16,
  },
  helpText: {
    color: colors.yellow_beige,
    fontSize: 20,
    fontFamily: fonts.b721,
    marginTop: size.height * 0.4 - 20,
  },
  btnText: {
    color: colors.blue_pepsi,
  },
  btnStyle: {
    borderColor: colors.yellow_outline,
  },
  show: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialog: {
    justifyContent: 'center',
    alignItems: 'center',
    width: size.width * 0.8,
    aspectRatio: 1.1 / 1,
    borderRadius: 16,
    overflow: 'hidden',
    gap: 16,
  },
  confirmText: {
    width: '75%',
    fontSize: 22,
    textAlign: 'center',
    fontFamily: fonts.b721,
    color: colors.red_pepsi,
    bottom: 15,
  },
  iconClose: {
    width: 24,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  btnClose: {
    left: '42%',
  },
});
