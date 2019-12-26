import { Dimensions } from 'react-native'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default {
  window: {
    width,
    height,
  },
  gridWidth: width - 32,
  gridWidthSmall: width - 64,
  isSmallDevice: width < 375,
}
