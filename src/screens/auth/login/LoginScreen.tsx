import {Image, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {fonts, images} from '@assets';
import {Background, Button, Input, RegularText} from '@components';
import {colors, size} from '@utils';
import {selectImageUrls, useAppSelector} from '@data';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootAuthParamLists} from '@screens/navigation';

type LoginScreenProps = NativeStackScreenProps<RootAuthParamLists>;

const _LoginScreen: React.FC<LoginScreenProps> = props => {
  const allImages = useAppSelector(selectImageUrls);

  const {navigation} = props;
  const navigateToRegister = () => navigation.navigate('Register');
  const navigateToVerify = () =>
    navigation.navigate('Verify', {phoneNumber: phone, type: true});

  const [phone, setPhone] = useState('');
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    setValidated(phone.length === 10);
  }, [phone]);
  return (
    <Background
      image={allImages[images.Background_Auth]}
      style={styles.background}>
      <RegularText content={'Hey, mừng bạn đến với'} />
      <RegularText content={'Pepsi Tết'} style={styles.brand} />
      <RegularText content={'ĐĂNG NHẬP'} style={styles.title} />
      <Input
        placeHolder={'Số điện thoại'}
        keyboardType={'phone-pad'}
        onChangetext={(text: string) => setPhone(text)}
      />
      <Image
        source={{uri: allImages[images.Banner_Login]}}
        style={styles.banner}
      />

      {validated ? (
        <Button
          content={'Lấy mã OTP'}
          background={allImages[images.Button_Red]}
          onPress={navigateToVerify}
        />
      ) : (
        <Button
          content={'Lấy mã OTP'}
          background={allImages[images.Button_Disable]}
          disable
        />
      )}

      <RegularText content={'Hoặc'} style={styles.orText} />
      <Button
        content={'Đăng ký'}
        background={allImages[images.Button_White]}
        textStyle={styles.btnLoginText}
        buttonStyle={styles.btnLogin}
        onPress={navigateToRegister}
      />
    </Background>
  );
};

export const LoginScreen = React.memo(_LoginScreen);

const styles = StyleSheet.create({
  background: {
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingTop: '30%',
  },
  brand: {
    fontSize: 30,
    fontFamily: fonts.b721,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.b721,
    marginTop: 60,
  },
  orText: {
    marginVertical: 12,
    fontSize: 16,
  },
  btnLoginText: {
    color: colors.blue_pepsi,
  },
  btnLogin: {
    borderColor: colors.yellow_outline,
  },
  banner: {
    width: size.width * 0.5,
    aspectRatio: 1,
    resizeMode: 'contain',
    marginVertical: 20,
  },
});
