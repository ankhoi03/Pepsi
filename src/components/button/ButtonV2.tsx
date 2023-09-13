import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React from 'react';
import {fonts} from '@assets';
import {colors, size} from '@utils';
import {FlexText} from '@components/text';

interface ButtonProps {
  content: string;
  numOfTurn?: number;
  background: string | undefined;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  disable?: true;
}

const _ButtonV2: React.FC<ButtonProps> = props => {
  const numOfTurn = [
    {
      bold: false,
      contentStyle: styles.whiteText,
      content: 'Bạn còn ',
    },
    {
      bold: true,
      contentStyle: styles.yellowText,
      content: props.numOfTurn + '',
    },
    {bold: false, contentStyle: styles.whiteText, content: ' lượt chơi'},
  ];
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={StyleSheet.flatten([styles.container, props.buttonStyle])}
      disabled={props.disable}>
      <Image source={{uri: props.background}} style={styles.background} />
      <Text style={StyleSheet.flatten([styles.contentStyle, props.textStyle])}>
        {props.content}
      </Text>
      <FlexText children={numOfTurn} />
    </TouchableOpacity>
  );
};

export const ButtonV2 = React.memo(_ButtonV2);

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: size.width * 0.6,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    gap: 2,
    borderColor: colors.yellow_outline,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  contentStyle: {
    fontSize: 18,
    fontFamily: fonts.b721,
    color: colors.white,
  },
  whiteText: {
    color: colors.white,
    fontSize: 15,
  },
  yellowText: {
    color: colors.yellow_beige,
    fontSize: 15,
  },
});
