import React from 'react'
import { createAppContainer } from 'react-navigation'
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch'
import { Transition } from 'react-native-reanimated'

import AppNavigator from './AppNavigator'
import AuthNavigator from './AuthNavigator'
import LoadingAuthScreen from '../screens/LoadingAuthScreen'

export default createAppContainer(
  createAnimatedSwitchNavigator(
    {
      // You could add another route here for authentication.
      // Read more at https://reactnavigation.org/docs/en/auth-flow.html
      App: AppNavigator,
      Auth: {
        screen: AuthNavigator,
        path: '',
      },
      Loading: LoadingAuthScreen,
    },
    {
      initialRouteName: 'Loading',
      transition: (
        <Transition.Sequence>
          <Transition.Out type="fade" durationMs={200} />
          <Transition.In type="fade" durationMs={200} />
        </Transition.Sequence>
      ),
    }
  )
)
