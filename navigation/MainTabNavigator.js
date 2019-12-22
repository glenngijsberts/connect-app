import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { color } from '../theme/Colors'
import TabBarIcon from '../components/TabBarIcon'

/*
  Screens
*/
import EventScreen from '../screens/EventStack/EventScreen'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
})

const EventStack = createStackNavigator(
  {
    Events: EventScreen,
  },
  config
)

EventStack.navigationOptions = {
  tabBarLabel: 'Evenementen',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-globe${focused ? '' : '-outline'}`
          : 'md-globe'
      }
    />
  ),
}

EventStack.path = ''

const tabNavigator = createBottomTabNavigator(
  {
    EventStack,
  },
  {
    tabBarOptions: {
      activeTintColor: color.primary,
      inactiveTintColor: color.grey,
      labelStyle: {
        fontWeight: '500',
      },
      style: {
        backgroundColor: color.white,
        borderTopWidth: 1,
        borderTopColor: color.greyLight,
      },
    },
  }
)

tabNavigator.path = ''

export default tabNavigator
