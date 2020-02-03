import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import React, { useState } from 'react'
import { Platform, StatusBar, View, AsyncStorage } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import AppNavigator from './navigation/AppNavigator'
import styled from 'styled-components/native'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { endpoint as uri } from './config'
import { RegisterProvider } from './context/RegisterContext'
import { AUTH_TOKEN } from './constants'

/*
  Setup of the ApolloClient and passing the
  token from the AsyncStorage if present
*/
const client = new ApolloClient({
  uri,
  request: async (operation) => {
    const token = await AsyncStorage.getItem(AUTH_TOKEN)
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    })
  },
})

const Container = styled(View)`
  flex: 1;
`

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/undraw_register.png'),
      require('./assets/images/undraw_registerComplete.png'),
      require('./assets/images/undraw_onboarding-1.png'),
      require('./assets/images/undraw_events.png'),
      require('./assets/images/undraw_add_event.png'),
      require('./assets/images/undraw_add_event_2.png'),
      require('./assets/images/undraw_add.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ])
}

function handleLoadingError(error) {
  /*
    Add some error handling later here
  */
  console.warn(error)
}

const App = ({ skipLoadingScreen, ...props }) => {
  const [isLoadingComplete, setLoadingComplete] = useState(false)

  if (!isLoadingComplete && !skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => setLoadingComplete(true)}
      />
    )
  } else {
    return (
      <ApolloProvider client={client}>
        <RegisterProvider>
          <Container>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </Container>
        </RegisterProvider>
      </ApolloProvider>
    )
  }
}

export default App
