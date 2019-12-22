import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'

/*
  Screens
*/
import RegisterScreen from '../screens/AuthStack/RegisterScreen'

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
  },
  config
)

export default AuthStack
