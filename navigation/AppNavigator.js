import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { color } from '../theme'

/*
  Stacks for the TabNavigator
*/
import { EventStack, ConnectionStack, DevStack } from './AppStacks'

/*
  Modals
*/
import EventAddedScreen from '../screens/Modals/EventAddedScreen'

/*
  This is the Navigator for the tabs. In here you'll add
  new stacks that you want to add to the tabbar
*/
const TabNavigator = createBottomTabNavigator(
  {
    EventStack,
    ConnectionStack,
    DevStack,
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

/*
  This is the global stack. This is the TabNavigator
  combined with Modals. In here you'll only add new modals
*/
const TabNavigatorWithModals = createStackNavigator(
  {
    Main: {
      screen: TabNavigator,
      navigationOptions: {
        header: null,
      },
    },
    EventAdded: {
      screen: EventAddedScreen,
    },
  },
  {
    mode: 'modal',
    headerBackTitleVisible: false,
    gesturesEnabled: false,
  }
)

export default TabNavigatorWithModals
