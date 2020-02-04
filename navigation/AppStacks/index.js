import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { Platform } from 'react-native'
import TabBarIcon from '../../components/TabBarIcon'

/*
  Screens
*/
import EventScreen from '../../screens/EventStack/EventScreen'
import AddEventScreen from '../../screens/EventStack/AddEventScreen'

import ConnectionScreen from '../../screens/ConnectionStack/ConnectionScreen'
import DevScreen from '../../screens/DevStack/DevScreen'

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
    AddEvent: AddEventScreen,
  },
  {
    headerBackTitleVisible: false,
    ...config,
  }
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
  DevStack
  Only use this stack while developing
*/
const DevStack = createStackNavigator(
  {
    Dev: DevScreen,
  },
  config
)

DevStack.navigationOptions = {
  tabBarLabel: 'Development',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-cog' : 'md-cog'}
    />
  ),
}

export { EventStack, ConnectionStack, DevStack }
