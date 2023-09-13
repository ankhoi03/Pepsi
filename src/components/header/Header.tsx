import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import {colors, size} from '@utils';
import {fonts, images} from '@assets';
import Modal from 'react-native-modal';
import {selectImageUrls, useAppSelector, useAppDispatch, logout} from '@data';
import {FlexText} from '@components/text';
import {Button} from '@components/button';

export interface HeaderProps {
  onPressBack?: () => void;
  iconBack: boolean;
  iconLogout: boolean;
  title?: string;
}

const _Header: React.FC<HeaderProps> = props => {
  const allImages = useAppSelector(selectImageUrls);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const [isShow, setIsShow] = useState(false);

  const DialogLogout: React.FC = () => {
    const confirmText = [
      {
        bold: false,
        contentStyle: styles.bluePepsiText,
        content: 'Bạn có chắc chắn muốn ',
      },
      {
        bold: true,
        contentStyle: styles.bluePepsiText,
        content: 'đăng xuất',
      },
      {bold: false, contentStyle: styles.bluePepsiText, content: ' không?'},
    ];
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
                source={{uri: allImages[images.popup_logout]}}>
                <FlexText style={styles.confirmText} children={confirmText} />
                <Button
                  content={'Đăng xuất'}
                  background={allImages[images.Button_Red]}
                  onPress={handleLogout}
                  buttonStyle={styles.btnConfirm}
                />
                <Button
                  content={'Hủy'}
                  background={allImages[images.Button_White]}
                  textStyle={styles.btnCancelText}
                  buttonStyle={styles.btnCancel}
                  onPress={() => setIsShow(false)}
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
    <View style={styles.header}>
      {props.iconBack ? (
        <TouchableOpacity onPress={props?.onPressBack}>
          <Image
            style={styles.icon}
            source={{uri: allImages[images.ic_back]}}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.null} />
      )}
      <Text style={styles.title}>{props?.title}</Text>
      {props.iconLogout ? (
        <TouchableOpacity onPress={() => setIsShow(true)}>
          <Image
            style={styles.icon}
            source={{uri: allImages[images.ic_logout]}}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.null} />
      )}
      <DialogLogout />
    </View>
  );
};

export const Header = React.memo(_Header);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    height: size.header,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 26,
    fontFamily: fonts.b721,
    color: colors.white,
    bottom: 3,
  },
  null: {
    width: 24,
    aspectRatio: 1,
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
    width: size.width * 0.7,
    aspectRatio: 1.3 / 1,
    resizeMode: 'contain',
    backgroundColor: colors.white,
    borderRadius: 10,
    overflow: 'hidden',
    gap: 10,
  },
  confirmText: {
    width: '70%',
    fontSize: 20,
    textAlign: 'center',
  },
  bluePepsiText: {
    color: colors.blue_pepsi,
  },
  btnCancelText: {
    color: colors.blue_pepsi,
  },
  btnCancel: {
    borderColor: colors.yellow_outline,
    width: '50%',
  },
  btnConfirm: {
    width: '50%',
    marginTop: 10,
  },
});
