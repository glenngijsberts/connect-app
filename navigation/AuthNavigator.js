import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'

/*
  Screens
*/
import RegisterScreen from '../screens/AuthStack/RegisterScreen'
import RegisterInfoScreen from '../screens/AuthStack/RegisterInfoScreen'
import RegisterPhotoScreen from '../screens/AuthStack/RegisterPhotoScreen'
import RegisterPasswordScreen from '../screens/AuthStack/RegisterPasswordScreen'
import RegisterCompleteScreen from '../screens/ModalStack/RegisterCompleteScreen'
import LoginScreen from '../screens/AuthStack/LoginScreen'

/*
  Config
*/
const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
})

/*
  AuthStack
*/

const MainStack = createStackNavigator(
  {
    Introduction: {
      screen: RegisterScreen,
      path: 'register',
    },
    RegisterInfoScreen: RegisterInfoScreen,
    RegisterPhotoScreen: RegisterPhotoScreen,
    RegisterPasswordScreen: RegisterPasswordScreen,
    Login: LoginScreen,
  },
  {
    ...config,
    mode: 'card',
    headerBackTitleVisible: false,
  }
)

const AuthStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
      path: '',
    },
    RegisterComplete: {
      screen: RegisterCompleteScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
)

export default AuthStack
