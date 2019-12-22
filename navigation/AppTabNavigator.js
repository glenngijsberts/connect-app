import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { color } from '../theme'
import TabBarIcon from '../components/TabBarIcon'

/*
  Screens
*/
import EventScreen from '../screens/EventStack/EventScreen'
import ConnectionScreen from '../screens/ConnectionStack/ConnectionScreen'

/*
  Config
*/
const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
})

/*
  EventStack
*/
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
      name={Platform.OS === 'ios' ? 'ios-globe' : 'md-globe'}
    />
  ),
}

/*
  ConnectionStack
*/
const ConnectionStack = createStackNavigator(
  {
    Connections: ConnectionScreen,
  },
  config
)

ConnectionStack.navigationOptions = {
  tabBarLabel: 'Connecties',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-briefcase' : 'md-briefcase'}
    />
  ),
}

/*
  TabNavigator
*/
const AppTabNavigator = createBottomTabNavigator(
  {
    EventStack,
    ConnectionStack,
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

export default AppTabNavigator
