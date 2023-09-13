import {StyleSheet, View, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import {fonts, images} from '@assets';
import {Background, Button, FlexText, Input, RegularText} from '@components';
import {colors} from '@utils';
import CheckBox from '@react-native-community/checkbox';
import {selectImageUrls, useAppSelector} from '@data';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootAuthParamLists} from '@screens/navigation';

type RegisterScreenProps = NativeStackScreenProps<RootAuthParamLists>;

const _RegisterScreen: React.FC<RegisterScreenProps> = props => {
  const allImages = useAppSelector(selectImageUrls);

  const {navigation} = props;
  const navigateToRule = () => navigation.navigate('Rule');
  const navigateToLogin = () => navigation.navigate('Login');
  const navigateToVerify = () =>
    navigation.navigate('Verify', {
      phoneNumber: phone,
      name: name,
      type: false,
    });

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const RuleText = [
    {
      bold: false,
      contentStyle: styles.whiteText,
      content: 'Tôi đã đọc và đồng ý với ',
    },
    {
      bold: true,
      contentStyle: styles.yellowText,
      content: 'thể lệ chương trình',
    },
    {bold: false, contentStyle: styles.whiteText, content: ' Pepsi Tết.'},
  ];
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    setValidated(toggleCheckBox && phone.length === 10 && name !== '');
  }, [toggleCheckBox, phone, name]);
  return (
    <Background
      image={allImages[images.Background_Auth]}
      style={styles.background}>
      <RegularText content={'Hey, mừng bạn đến với'} />
      <RegularText content={'Pepsi Tết'} style={styles.brand} />
      <RegularText content={'ĐĂNG KÝ'} style={styles.title} />

      <Input
        placeHolder={'Số điện thoại'}
        keyboardType={'phone-pad'}
        onChangetext={(text: string) => setPhone(text)}
      />
      <Input
        placeHolder={'Tên người dùng'}
        onChangetext={(text: string) => setName(text)}
      />

      <View style={styles.ruleView}>
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          tintColors={{true: '#FFFFFF', false: '#FFFFFF'}}
          onValueChange={newValue => setToggleCheckBox(newValue)}
        />
        <Pressable onPress={navigateToRule}>
          <FlexText children={RuleText} />
        </Pressable>
      </View>
      {validated ? (
        <Button
          content={'Lấy mã OTP'}
          background={allImages[images.Button_Red]}
          buttonStyle={styles.btnRegister}
          onPress={navigateToVerify}
        />
      ) : (
        <Button
          content={'Lấy mã OTP'}
          background={allImages[images.Button_Disable]}
          buttonStyle={styles.btnRegister}
          disable
        />
      )}

      <RegularText content={'Hoặc'} style={styles.orText} />
      <Button
        content={'ĐĂNG NHẬP'}
        background={allImages[images.Button_White]}
        textStyle={styles.btnLoginText}
        buttonStyle={styles.btnLogin}
        onPress={navigateToLogin}
      />
    </Background>
  );
};

export const RegisterScreen = React.memo(_RegisterScreen);

const styles = StyleSheet.create({
  background: {
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingTop: 120,
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
  ruleView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginTop: 14,
  },
  whiteText: {
    color: colors.white,
    fontSize: 15,
  },
  yellowText: {
    color: colors.yellow_beige,
    fontSize: 15,
  },
  btnRegister: {
    marginTop: '35%',
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
});
