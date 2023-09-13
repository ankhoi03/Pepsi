import {StyleSheet, Pressable, View, ToastAndroid} from 'react-native';
import React, {useState, useEffect} from 'react';
import {fonts, images} from '@assets';
import {Background, Button, FlexText, RegularText} from '@components';
import {colors, size} from '@utils';
import {
  selectImageUrls,
  useAppSelector,
  useAppDispatch,
  performLogin,
  performRegister,
} from '@data';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootAuthParamLists} from '@screens/navigation';
import OTPInputView from '@twotalltotems/react-native-otp-input';

type VerifyScreenProps = NativeStackScreenProps<RootAuthParamLists, 'Verify'>;

const _VerifyScreen: React.FC<VerifyScreenProps> = props => {
  const allImages = useAppSelector(selectImageUrls);
  const dispatch = useAppDispatch();

  const {route} = props;
  const phoneNumber = route.params?.phoneNumber;
  const name = route.params?.name;
  const type = route.params?.type;

  const [validated, setValidated] = useState(false);
  const ResendText = [
    {
      bold: false,
      contentStyle: styles.whiteText,
      content: 'Bạn chưa nhận được mã? ',
    },
    {
      bold: true,
      contentStyle: styles.yellowText,
      content: 'Gửi lại mã',
    },
  ];
  const [displaySub, setDisplaySub] = useState<'flex' | 'none' | undefined>(
    'flex',
  );
  const [displayWrong, setDisplayWrong] = useState<'flex' | 'none' | undefined>(
    'none',
  );
  const [borderColorOTP, setBorderColorOTP] = useState(colors.white);
  const [codeColorOTP, setcodeColorOTP] = useState(colors.white);

  const codeOTP = '9999';
  const [code, setCode] = useState('');
  const handleCheckOTP = async () => {
    if (code !== codeOTP) {
      setDisplaySub('none');
      setDisplayWrong('flex');
      setcodeColorOTP(colors.red_pepsi);
      setBorderColorOTP(colors.red_pepsi);
      return false;
    } else {
      if (type) {
        await dispatch(performLogin({phone: phoneNumber, password: code}));
      } else {
        await dispatch(
          performRegister({
            phone: phoneNumber,
            password: code,
            name: name as string,
          }),
        );
      }
    }
  };

  const handleResetOTP = () => {
    setDisplaySub('flex');
    setDisplayWrong('none');
    setcodeColorOTP(colors.white);
    setBorderColorOTP(colors.grey_outline);
    setCode('');
  };
  const handleResendOTP = () => {
    ToastAndroid.show('Gửi lại mã thành công', ToastAndroid.SHORT);
    handleResetOTP();
  };
  useEffect(() => {
    setValidated(code.length === 4);
  }, [code]);
  return (
    <Background
      image={allImages[images.Background_Auth]}
      style={styles.background}>
      <RegularText content={'Hey, mừng bạn đến với'} />
      <RegularText content={'Pepsi Tết'} style={styles.brand} />
      <RegularText content={'XÁC MINH OTP'} style={styles.title} />
      <RegularText
        content={'Nhập mã OTP vừa gửi về số điện thoại của bạn'}
        style={[styles.sub, {display: displaySub}]}
      />
      <RegularText
        content={'Mã OTP không đúng, vui lòng nhập lại'}
        style={[styles.wrong, {display: displayWrong}]}
      />
      <View style={styles.otpInputView}>
        <OTPInputView
          style={styles.inputView}
          pinCount={4}
          autoFocusOnLoad={false}
          keyboardType={'phone-pad'}
          codeInputFieldStyle={StyleSheet.flatten([
            styles.otpStyleBase,
            {borderColor: borderColorOTP, color: codeColorOTP},
          ])}
          code={code}
          onCodeChanged={codeInput => {
            setCode(codeInput);
          }}
        />
      </View>

      {validated ? (
        <>
          <Button
            content={'Xác nhận'}
            background={allImages[images.Button_Red]}
            buttonStyle={[styles.btnConfirm, {display: displaySub}]}
            onPress={handleCheckOTP}
          />
          <Button
            content={'Nhập lại'}
            background={allImages[images.Button_White]}
            buttonStyle={[styles.btnConfirm, {display: displayWrong}]}
            textStyle={styles.redText}
            onPress={handleResetOTP}
          />
        </>
      ) : (
        <Button
          content={'Xác nhận'}
          background={allImages[images.Button_Disable]}
          buttonStyle={styles.btnConfirm}
          disable
        />
      )}
      <Pressable onPress={handleResendOTP}>
        <FlexText children={ResendText} />
      </Pressable>
    </Background>
  );
};

export const VerifyScreen = React.memo(_VerifyScreen);

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
  sub: {
    marginVertical: 12,
    fontSize: 16,
  },
  wrong: {
    marginVertical: 12,
    fontSize: 16,
    color: colors.red_pepsi,
  },
  btnLoginText: {
    color: colors.blue_pepsi,
  },
  btnConfirm: {
    marginVertical: 12,
  },
  banner: {
    width: size.width * 0.5,
    aspectRatio: 1,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  whiteText: {
    color: colors.white,
    fontSize: 15,
  },
  yellowText: {
    color: colors.yellow_beige,
    fontSize: 15,
  },
  redText: {
    color: colors.red_pepsi,
  },
  otpInputView: {
    width: '100%',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    width: '56%',
    height: 50,
  },
  otpStyleBase: {
    width: 44,
    height: 44,
    borderWidth: 1.5,
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.b721,
    borderRadius: 8,
  },
});
