import {
  StyleSheet,
  Image,
  StatusBar,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {
  Background,
  Header,
  Button,
  RegularText,
  FlexText,
  Coin,
} from '@components';
import {selectImageUrls, useAppSelector} from '@data';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootMainParamLists} from '@screens/navigation';
import {images, fonts} from '@assets';
import {colors, size} from '@utils';
import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper';

type CollectionScreenProps = NativeStackScreenProps<RootMainParamLists>;

const _CollectionScreen: React.FC<CollectionScreenProps> = props => {
  const allImages = useAppSelector(selectImageUrls);
  const {navigation} = props;
  const goBack = () => navigation.goBack();
  const [isShow, setIsShow] = React.useState(false);
  const numPepsi = 6;
  const num7Up = 2;
  const numMirinda = 4;
  const minQuantity = Math.min(numPepsi, num7Up, numMirinda);
  const [numGift, setNumGift] = React.useState(1);
  const increment = () => {
    if (numGift < minQuantity) {
      setNumGift(numGift + 1);
    }
  };
  const decrement = () => {
    if (numGift > 0) {
      setNumGift(numGift - 1);
    }
  };

  const content = [
    {
      bold: false,
      contentStyle: styles.whiteText,
      content: 'Đổi ngay bộ sưu tập ',
    },
    {
      bold: true,
      contentStyle: styles.yellowText,
      content: 'AN - LỘC - PHÚC',
    },
    {
      bold: false,
      contentStyle: styles.whiteText,
      content: ' để có cơ hội nhận ngay ',
    },
    {
      bold: true,
      contentStyle: styles.yellowText,
      content: '300 coins',
    },
    {
      bold: false,
      contentStyle: styles.whiteText,
      content: ' hoặc ',
    },
    {
      bold: true,
      contentStyle: styles.yellowText,
      content: 'một phần quà may mắn',
    },
  ];

  const DialogGift: React.FC = () => {
    const giftContent = [
      {
        bold: false,
        contentStyle: styles.whiteText,
        content: 'Bạn có chắc chắn muốn đổi ',
      },
      {
        bold: true,
        contentStyle: styles.yellowText,
        content: numGift + ' combo',
      },
      {
        bold: false,
        contentStyle: styles.whiteText,
        content: ' hay không?',
      },
    ];
    const giftList = [
      {
        bold: false,
        contentStyle: styles.whiteText,
        content: 'Bạn nhận được ',
      },
      {
        bold: true,
        contentStyle: styles.yellowText,
        content: '300 coins',
      },
    ];
    const giftList2 = [
      {
        bold: false,
        contentStyle: styles.whiteText,
        content: 'Bạn nhận được ',
      },
      {
        bold: true,
        contentStyle: styles.yellowText,
        content: '1 Pepsi Bucket Hat',
      },
    ];
    const [isReceived, setIsReceived] = React.useState(false);
    return (
      <>
        {isShow ? (
          <View style={styles.show}>
            <StatusBar
              translucent
              backgroundColor={'rgba(0, 0, 0, 0.7)'}
              barStyle={'light-content'}
            />
            <Modal
              isVisible={true}
              style={styles.modal}
              backdropOpacity={0.7}
              onBackdropPress={() => setIsShow(false)}>
              {!isReceived ? (
                <View style={styles.giftShow}>
                  <Image
                    source={{uri: allImages[images.gift]}}
                    style={styles.gift}
                  />
                  <FlexText children={giftContent} style={styles.giftContent} />
                  <Button
                    content={'Đổi quà'}
                    background={allImages[images.Button_Red]}
                    textStyle={styles.btnText}
                    buttonStyle={styles.giftButton}
                    onPress={() => setIsReceived(true)}
                  />
                  <TouchableOpacity onPress={() => setIsShow(false)}>
                    <Image
                      source={{uri: allImages[images.ic_close]}}
                      style={styles.giftClose}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <>
                  {numGift > 1 ? (
                    <View style={styles.openView}>
                      <View style={styles.swiper}>
                        <Swiper
                          showsButtons
                          showsPagination={false}
                          loop={false}>
                          <View style={styles.swiperView}>
                            <ImageBackground
                              source={{uri: allImages[images.gift_open]}}
                              style={styles.giftOpen}>
                              <Image
                                source={{uri: allImages[images.coin]}}
                                style={styles.giftReward}
                              />
                            </ImageBackground>
                            <FlexText
                              children={giftList}
                              style={styles.giftList}
                            />
                          </View>

                          <View style={styles.swiperView}>
                            <ImageBackground
                              source={{uri: allImages[images.gift_open]}}
                              style={styles.giftOpen}>
                              <Image
                                source={{uri: allImages[images.gift_hat]}}
                                style={styles.giftReward}
                              />
                            </ImageBackground>
                            <FlexText
                              children={giftList2}
                              style={styles.giftList}
                            />
                          </View>
                        </Swiper>
                      </View>

                      <TouchableOpacity onPress={() => setIsShow(false)}>
                        <Image
                          source={{uri: allImages[images.ic_close]}}
                          style={styles.giftClose}
                        />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={styles.openView}>
                      <ImageBackground
                        source={{uri: allImages[images.gift_open]}}
                        style={styles.giftOpen}>
                        <Image
                          source={{uri: allImages[images.coin]}}
                          style={styles.giftReward}
                        />
                      </ImageBackground>
                      <FlexText children={giftList} style={styles.giftList} />
                      <TouchableOpacity onPress={() => setIsShow(false)}>
                        <Image
                          source={{uri: allImages[images.ic_close]}}
                          style={styles.giftClose}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              )}
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
        title={'BỘ SƯU TẬP'}
        onPressBack={goBack}
      />
      <Coin />
      <Image
        source={{uri: allImages[images.Banner_Collection]}}
        style={styles.banner}
      />
      <View style={styles.numOfCan}>
        <RegularText content={numPepsi.toString()} style={styles.num} />
        <RegularText content={num7Up.toString()} style={styles.num} />
        <RegularText content={numMirinda.toString()} style={styles.num} />
      </View>
      <FlexText children={content} style={styles.content} />
      <View style={styles.buttonView}>
        {numGift <= 1 ? (
          <Button
            background={allImages[images.ic_decrement_disable]}
            buttonStyle={styles.btnNum}
            disable
          />
        ) : (
          <Button
            background={allImages[images.ic_decrement_enable]}
            buttonStyle={styles.btnNum}
            onPress={decrement}
          />
        )}
        <RegularText content={numGift.toString()} style={styles.num} />
        {numGift >= minQuantity ? (
          <Button
            background={allImages[images.ic_increment_disable]}
            buttonStyle={styles.btnNum}
            disable
          />
        ) : (
          <Button
            background={allImages[images.ic_increment_enable]}
            buttonStyle={styles.btnNum}
            onPress={increment}
          />
        )}
      </View>
      {minQuantity <= 0 ? (
        <Button
          content={'Đổi ngay'}
          background={allImages[images.Button_Disable]}
          textStyle={styles.btnText}
          buttonStyle={styles.btnStyle}
          disable
        />
      ) : (
        <Button
          content={'Đổi ngay'}
          background={allImages[images.Button_Red]}
          textStyle={styles.btnText}
          buttonStyle={styles.btnStyle}
          onPress={() => setIsShow(true)}
        />
      )}

      <DialogGift />
    </Background>
  );
};

export const CollectionScreen = React.memo(_CollectionScreen);

const styles = StyleSheet.create({
  background: {
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingTop: '10%',
    gap: 20,
  },
  banner: {
    width: size.width * 0.85,
    aspectRatio: 3 / 2,
    resizeMode: 'contain',
  },
  numOfCan: {
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: 10,
  },
  num: {
    fontSize: 18,
    fontFamily: fonts.b721,
    color: colors.white,
  },
  whiteText: {
    color: colors.white,
    fontSize: 16,
  },
  yellowText: {
    color: colors.yellow_beige,
    fontSize: 16,
    fontFamily: fonts.b721,
  },
  content: {
    width: '72%',
    textAlign: 'center',
  },
  buttonView: {
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnNum: {
    width: 28,
    aspectRatio: 1,
    resizeMode: 'contain',
    borderRadius: 99,
  },
  btnText: {
    color: colors.white,
  },
  btnStyle: {
    borderColor: colors.yellow_outline,
    marginTop: 20,
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
  giftShow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  giftContent: {
    width: size.width * 0.5 - 20,
    textAlign: 'center',
  },
  gift: {
    width: size.width * 0.6,
    aspectRatio: 3 / 2,
    resizeMode: 'contain',
  },
  giftButton: {
    width: size.width * 0.3,
    borderColor: colors.yellow_outline,
    marginVertical: 30,
  },
  giftClose: {
    width: 24,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  openView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 48,
  },
  giftList: {
    width: size.width * 0.3,
    textAlign: 'center',
  },
  giftOpen: {
    width: size.width * 0.6,
    aspectRatio: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  giftReward: {
    width: size.width * 0.25,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  swiper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '44%',
  },
  swiperView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
});
