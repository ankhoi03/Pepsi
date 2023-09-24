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

interface ButtonProps {
  content?: string;
  background: string | undefined;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  disable?: true;
}

const _Button: React.FC<ButtonProps> = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={StyleSheet.flatten([styles.container, props.buttonStyle])}
      disabled={props.disable}>
      <Image source={{uri: props.background}} style={styles.background} />
      <Text style={StyleSheet.flatten([styles.contentStyle, props.textStyle])}>
        {props?.content}
      </Text>
    </TouchableOpacity>
  );
};

export const Button = React.memo(_Button);

const styles = StyleSheet.create({
  container: {
    height: 44,
    width: size.width * 0.6,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.grey_outline,
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
    bottom: 2,
  },
});
