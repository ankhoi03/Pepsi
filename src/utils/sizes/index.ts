import {Dimensions} from 'react-native';

const _width = Dimensions.get('screen').width;
const _height = Dimensions.get('screen').height;

export const size = {
  width: _width,
  height: _height - 24,
  header: 42,
};
