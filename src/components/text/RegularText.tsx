import {StyleSheet, Text, StyleProp, TextStyle} from 'react-native';
import React from 'react';
import {fonts} from '@assets';
import {colors} from '@utils';

interface RegularTextProps {
  content: string;
  style?: StyleProp<TextStyle>;
}

const _RegularText: React.FC<RegularTextProps> = props => {
  return (
    <Text style={StyleSheet.flatten([styles.textStyle, props.style])}>
      {props.content}
    </Text>
  );
};

export const RegularText = React.memo(_RegularText);
const styles = StyleSheet.create({
  textStyle: {
    fontFamily: fonts.regular,
    fontSize: 18,
    color: colors.white,
  },
});
