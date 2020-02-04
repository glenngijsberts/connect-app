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
import LoginScreen from '../screens/AuthStack/LoginScreen'

/*
  Modals
*/
import RegisterCompleteScreen from '../screens/Modals/RegisterCompleteScreen'

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
const AuthStack = createStackNavigator(
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

const AuthStackWithModals = createStackNavigator(
  {
    Main: {
      screen: AuthStack,
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

export default AuthStackWithModals
