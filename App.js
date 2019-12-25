import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import React, { useState } from 'react'
import { Platform, StatusBar, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import AppNavigator from './navigation/AppNavigator'
import styled from 'styled-components/native'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { endpoint as uri } from './config'

// Create the client as outlined in the setup guide
const client = new ApolloClient({
  uri,
})

const Container = styled(View)`
  flex: 1;
`

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([require('./assets/images/undraw_register.png')]),
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
        <Container>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator initialSwitch="App" />
        </Container>
      </ApolloProvider>
    )
  }
}

export default App
