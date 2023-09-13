import {StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {colors, size} from '@utils';

export interface InputProps {
  placeHolder: string;
  keyboardType?: any;
  onChangetext?: (text: string) => void;
}

const _Input: React.FC<InputProps> = props => {
  return (
    <TextInput
      keyboardType={props.keyboardType}
      placeholder={props.placeHolder}
      onChangeText={props.onChangetext}
      style={styles.textInput}
    />
  );
};

export const Input = React.memo(_Input);

const styles = StyleSheet.create({
  textInput: {
    width: size.width * 0.9,
    height: 48,
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 20,
  },
});
