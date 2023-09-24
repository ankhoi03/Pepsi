import {Animated, PanResponder, StyleSheet, Image} from 'react-native';
import React, {useRef} from 'react';
import {Background, FlexText, Header} from '@components';
import {selectImageUrls, useAppSelector} from '@data';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootMainParamLists} from '@screens/navigation';
import {images} from '@assets';
import {size, colors} from '@utils';

type GameScreenProps = NativeStackScreenProps<RootMainParamLists, 'Game'>;

const _GameScreen: React.FC<GameScreenProps> = props => {
  const allImages = useAppSelector(selectImageUrls);
  const {navigation, route} = props;
  let type = route.params?.type;
  const goBack = () => navigation.goBack();
  const goPresent = () => navigation.navigate('Reward');
  const numOfTurnFree = [
    {
      bold: false,
      contentStyle: styles.whiteText,
      content: 'Bạn còn ',
    },
    {
      bold: true,
      contentStyle: styles.yellowText,
      content: '3',
    },
    {
      bold: false,
      contentStyle: styles.whiteText,
      content: ' lượt chơi miễn phí',
    },
  ];
  const numOfTurnPay = [
    {
      bold: false,
      contentStyle: styles.whiteText,
      content: 'Bạn còn ',
    },
    {
      bold: true,
      contentStyle: styles.yellowText,
      content: '5',
    },
    {
      bold: false,
      contentStyle: styles.whiteText,
      content: ' lượt chơi quy đổi',
    },
  ];
  //animation
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const {dy} = gestureState;
        pan.setValue({x: 0, y: dy});
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy < -50) {
          goPresent();
        } else {
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <Background
      image={allImages[images.Background_Game]}
      style={styles.background}>
      <Header
        iconBack={true}
        iconLogout={true}
        title={'VUỐT LÊN ĐỂ CHƠI'}
        onPressBack={goBack}
      />
      <FlexText children={type ? numOfTurnFree : numOfTurnPay} />
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.box, pan.getLayout()]}>
        <Image
          source={{uri: allImages[images.pepsi_unicorn]}}
          style={styles.pepsi_unicorn}
        />
      </Animated.View>
    </Background>
  );
};

export const GameScreen = React.memo(_GameScreen);

const styles = StyleSheet.create({
  background: {
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingTop: '10%',
  },
  whiteText: {
    color: colors.white,
    fontSize: 15,
  },
  yellowText: {
    color: colors.yellow_beige,
    fontSize: 15,
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: size.height * 0.7,
  },
  pepsi_unicorn: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
