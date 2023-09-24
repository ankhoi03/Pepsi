import {
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  View,
} from 'react-native';
import React from 'react';
import {Background, Header, Button, RegularText, FlexText} from '@components';
import {selectImageUrls, useAppSelector} from '@data';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootMainParamLists} from '@screens/navigation';
import {images, fonts} from '@assets';
import {colors, size} from '@utils';
import Modal from 'react-native-modal';

type ScanScreenProps = NativeStackScreenProps<RootMainParamLists>;

const _ScanScreen: React.FC<ScanScreenProps> = props => {
  const allImages = useAppSelector(selectImageUrls);
  const {navigation} = props;
  const goBack = () => navigation.goBack();
  const goToGame = () => navigation.navigate('Game', {type: false});
  const onPlay = () => {
    setIsShow(false);
    goToGame();
  };
  const [isShow, setIsShow] = React.useState(false);
  const numOfTurn = [
    {
      bold: false,
      contentStyle: styles.blackText,
      content: 'Bạn đang có ',
    },
    {
      bold: true,
      contentStyle: styles.blueText,
      content: '08',
    },
    {
      bold: false,
      contentStyle: styles.blackText,
      content: ' lượt chơi',
    },
  ];

  const DialogScan: React.FC = () => {
    return (
      <>
        {isShow ? (
          <View style={styles.show}>
            <StatusBar
              translucent
              backgroundColor={'rgba(0, 0, 0, 0.5)'}
              barStyle={'light-content'}
            />
            <Modal
              isVisible={true}
              style={styles.modal}
              backdropOpacity={0.5}
              onBackdropPress={() => setIsShow(false)}>
              <ImageBackground
                style={styles.dialog}
                source={{uri: allImages[images.popup_scan]}}>
                <TouchableOpacity
                  style={styles.btnClose}
                  onPress={() => setIsShow(false)}>
                  <Image
                    source={{uri: allImages[images.ic_close]}}
                    style={styles.iconClose}
                  />
                </TouchableOpacity>
                <RegularText content={'Bạn nhận được'} style={styles.content} />
                <RegularText content={'5'} style={styles.turn} />
                <RegularText content={'Lượt chơi'} style={styles.content} />

                <FlexText children={numOfTurn} />

                <Button
                  content={'Scan tiếp'}
                  background={allImages[images.Button_Red]}
                  buttonStyle={styles.btnConfirm}
                  onPress={() => setIsShow(false)}
                />

                <Button
                  content={'Chơi ngay'}
                  background={allImages[images.Button_Red]}
                  buttonStyle={styles.btnConfirm}
                  onPress={onPlay}
                />
              </ImageBackground>
              <Image
                source={{uri: allImages[images.gift_box]}}
                style={styles.giftBox}
              />
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
      image={allImages[images.Background_Avg]}
      style={styles.background}>
      <Header
        iconBack={true}
        iconLogout={true}
        title={'QUÉT MÃ'}
        onPressBack={goBack}
      />
      <Image source={{uri: allImages[images.bill]}} style={styles.bill} />
      <Button
        content={'Quét mã'}
        background={allImages[images.Button_Red]}
        textStyle={styles.btnText}
        buttonStyle={styles.btnStyle}
        onPress={() => setIsShow(true)}
      />
      <DialogScan />
    </Background>
  );
};

export const ScanScreen = React.memo(_ScanScreen);

const styles = StyleSheet.create({
  background: {
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingTop: '10%',
    gap: 30,
  },
  bill: {
    width: size.width * 0.8,
    aspectRatio: 1 / 1.8,
    resizeMode: 'contain',
    borderRadius: 6,
  },
  btnText: {
    color: colors.white,
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
    aspectRatio: 1 / 1.45,
    gap: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  iconClose: {
    width: 24,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  btnClose: {
    left: '44%',
    bottom: '5%',
  },
  giftBox: {
    width: '70%',
    aspectRatio: 2 / 1,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: '73%',
  },
  blackText: {
    color: colors.black,
    fontSize: 18,
  },
  blueText: {
    color: colors.blue_dark,
    fontSize: 18,
  },
  btnConfirm: {
    width: '45%',
    borderColor: colors.yellow_outline,
  },
  content: {
    fontSize: 24,
    color: colors.black,
    lineHeight: 28,
  },
  turn: {
    fontSize: 80,
    color: colors.blue_dark,
    fontFamily: fonts.b721,
    lineHeight: 90,
  },
});
