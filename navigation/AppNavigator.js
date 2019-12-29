import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import AppTabNavigator from './AppTabNavigator'
import AuthNavigator from './AuthNavigator'
import LoadingAuthScreen from '../screens/LoadingAuthScreen'

export default createAppContainer(
  createSwitchNavigator(
    {
      // You could add another route here for authentication.
      // Read more at https://reactnavigation.org/docs/en/auth-flow.html
      App: AppTabNavigator,
      Auth: {
        screen: AuthNavigator,
        path: '',
      },
      Loading: LoadingAuthScreen,
    },
    {
      initialRouteName: 'Loading',
    }
  )
)
