import {Dimensions} from 'react-native';

const _height = Dimensions.get('window').height;
const _width = Dimensions.get('window').width;

export const size = {
  width: _width,
  height: _height,
  header: 42,
};
