import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import {colors, size} from '@utils';
import {selectImageUrls, useAppSelector} from '@data';
import {fonts, images} from '@assets';
import {FlexText, RegularText} from '@components/text';
import {Button} from '@components/button';
import {PepsiItem} from './interface';
import Modal from 'react-native-modal';

interface ItemProps {
  item: PepsiItem;
}

const _GiftItem: React.FC<ItemProps> = props => {
  const {item} = props;
  const allImages = useAppSelector(selectImageUrls);
  const info = useAppSelector(state => state.auth.currentUser);
  const [isShow, setIsShow] = React.useState(false);
  const gift = [
    {
      bold: false,
      contentStyle: styles.blueText,
      content: 'Quà của bạn: ',
    },
    {
      bold: true,
      contentStyle: styles.redText,
      content: item.name,
    },
  ];
  const Dialog: React.FC = () => {
    const [isConfirm, setIsConfirm] = React.useState(false);
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
              {!isConfirm ? (
                <ImageBackground
                  style={styles.dialog}
                  source={{uri: allImages[images.dialog_input_info]}}>
                  <TouchableOpacity
                    style={styles.btnClose}
                    onPress={() => setIsShow(false)}>
                    <Image
                      source={{uri: allImages[images.ic_close]}}
                      style={styles.iconClose}
                    />
                  </TouchableOpacity>
                  <RegularText
                    content={'THÔNG TIN NHẬN QUÀ'}
                    style={styles.dialogTitle}
                  />
                  <FlexText children={gift} style={styles.nameGift} />
                  <View>
                    <RegularText
                      content={'Họ và tên'}
                      style={styles.blueText}
                    />
                    <TextInput value={info.name} style={styles.inputInfo} />
                  </View>
                  <View>
                    <RegularText
                      content={'Số điện thoại'}
                      style={styles.blueText}
                    />
                    <TextInput value={info.phone} style={styles.inputInfo} />
                  </View>
                  <View>
                    <RegularText content={'Địa chỉ'} style={styles.blueText} />
                    <TextInput
                      placeholder={'Nhập địa chỉ của bạn'}
                      style={styles.inputAddress}
                    />
                  </View>
                  <View>
                    <RegularText content={'Ghi chú'} style={styles.blueText} />
                    <TextInput
                      placeholder={'Ghi chú (nếu có)'}
                      style={styles.inputAddress}
                    />
                  </View>
                  <Button
                    content={'Xác nhận'}
                    background={allImages[images.Button_Red]}
                    textStyle={styles.btnText2}
                    buttonStyle={styles.btnStyle2}
                    onPress={() => setIsConfirm(true)}
                  />
                </ImageBackground>
              ) : (
                <ImageBackground
                  style={styles.message}
                  source={{uri: allImages[images.diaolog_message]}}>
                  <RegularText
                    content={'THÀNH CÔNG'}
                    style={styles.messageText1}
                  />
                  <RegularText
                    content={'Chúc mừng bạn nhận được quà từ PEPSI TẾT'}
                    style={styles.messageText2}
                  />
                </ImageBackground>
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
    <View style={styles.container}>
      <View style={styles.item}>
        <View style={styles.topView}>
          <Image source={{uri: item.image}} style={styles.gift} />
        </View>
        <View style={styles.bottomView}>
          <RegularText content={item.name} style={styles.name} />
          <RegularText
            content={'Còn lại: ' + item.quantity}
            style={styles.quantity}
          />
          <Button
            content={'Đổi quà'}
            background={allImages[images.Button_White]}
            textStyle={styles.btnText}
            buttonStyle={styles.btnStyle}
            onPress={() => setIsShow(true)}
          />
        </View>
      </View>
      <View style={styles.tagView}>
        <Image source={{uri: allImages[images.ic_tag]}} style={styles.tag} />
        <RegularText
          content={item.price.toString()}
          style={styles.tagContent}
        />
      </View>
      <Dialog />
    </View>
  );
};

export const GiftItem = React.memo(_GiftItem);

const styles = StyleSheet.create({
  container: {
    width: size.width * 0.4,
    aspectRatio: 2 / 3,
  },
  item: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
  },
  topView: {
    width: '100%',
    aspectRatio: 4.5 / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gift: {
    width: size.width * 0.35,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  bottomView: {
    flex: 1,
    gap: 6,
    backgroundColor: colors.red_pepsi,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagView: {
    position: 'absolute',
    top: 12,
    right: -7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tag: {
    width: size.width * 0.175,
    aspectRatio: 1.75 / 1,
    resizeMode: 'contain',
  },
  tagContent: {
    position: 'absolute',
    alignSelf: 'center',
    fontFamily: fonts.b721,
    fontSize: 18,
  },
  name: {
    fontFamily: fonts.b721,
    fontSize: 14,
    color: colors.yellow_beige,
    lineHeight: 16,
  },
  quantity: {
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 14,
    color: colors.white,
  },
  btnText: {
    color: colors.blue_pepsi,
    fontSize: 14,
  },
  btnStyle: {
    borderColor: colors.yellow_outline,
    width: '60%',
    height: 32,
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
    paddingHorizontal: 20,
    width: size.width * 0.8,
    aspectRatio: 1 / 1.75,
    borderRadius: 12,
    overflow: 'hidden',
  },
  iconClose: {
    width: 24,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  btnClose: {
    left: '48%',
    bottom: 8,
  },
  dialogTitle: {
    fontFamily: fonts.b721,
    fontSize: 20,
    color: colors.blue_dark,
    marginBottom: 16,
  },
  blueText: {
    color: colors.blue_dark,
    fontSize: 16,
    fontFamily: fonts.b721,
    marginTop: 8,
  },
  redText: {
    color: colors.red_pepsi,
    fontSize: 18,
    fontFamily: fonts.b721,
  },
  nameGift: {
    textAlign: 'left',
    width: '100%',
  },
  inputInfo: {
    width: size.width * 0.8 - 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.black,
    marginTop: 4,
  },
  inputAddress: {
    width: size.width * 0.8 - 40,
    height: 70,
    borderRadius: 8,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.black,
    marginTop: 4,
    textAlignVertical: 'top',
  },
  btnText2: {
    color: colors.white,
    fontSize: 18,
    bottom: 3,
  },
  btnStyle2: {
    borderColor: colors.yellow_outline,
    width: size.width * 0.35,
    height: 44,
    marginTop: 16,
  },
  message: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: size.width * 0.8,
    aspectRatio: 2.4 / 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  messageText1: {
    fontFamily: fonts.b721,
    fontSize: 24,
    color: colors.yellow_beige,
    marginBottom: 12,
  },
  messageText2: {
    fontFamily: fonts.regular,
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
  },
});
