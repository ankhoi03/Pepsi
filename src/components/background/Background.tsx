import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  ImageBackground,
  StatusBar,
} from 'react-native';
import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {size} from '@utils';

type BackgroundProps = {
  children: React.ReactNode;
  image: string | undefined;
  style?: StyleProp<ViewStyle>;
};

const _Background: React.FC<BackgroundProps> = props => {
  return (
    <KeyboardAwareScrollView
      extraScrollHeight={-420}
      enableOnAndroid
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
    </KeyboardAwareScrollView>
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
