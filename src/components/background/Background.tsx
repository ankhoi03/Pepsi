import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  ImageBackground,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';
import {size} from '@utils';

type BackgroundProps = {
  children: React.ReactNode;
  image: string | undefined;
  style?: StyleProp<ViewStyle>;
};

const _Background: React.FC<BackgroundProps> = props => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -size.height * 0.2}
      style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'light-content'}
      />
      <ImageBackground
        source={{uri: props.image}}
        style={StyleSheet.flatten([styles.background, props.style])}>
        {props.children}
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export const Background = React.memo(_Background);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: size.width,
    height: size.height,
    alignItems: 'center',
  },
});
