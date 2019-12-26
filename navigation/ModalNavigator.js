import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'

/*
  Screens
*/
import RegisterCompleteScreen from '../screens/ModalStack/RegisterCompleteScreen'

/*
  Config
*/
const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
})

/*
  ModalStack
*/
const ModalStack = createStackNavigator(
  {
    ModalRegisterComplete: RegisterCompleteScreen,
  },
  {
    ...config,
    headerBackTitleVisible: false,
    mode: 'modal',
  }
)

export default ModalStack
