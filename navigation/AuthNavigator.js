import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'

/*
  Screens
*/
import RegisterScreen from '../screens/AuthStack/RegisterScreen'
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
const AuthStack = createStackNavigator(
  {
    Introduction: RegisterScreen,
    Login: LoginScreen,
  },
  {
    ...config,
    headerBackTitleVisible: false,
  }
)

export default AuthStack
