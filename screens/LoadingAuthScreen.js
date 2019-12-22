import React, { useState, useEffect } from 'react'
import { View, ActivityIndicator, StatusBar, AsyncStorage } from 'react-native'
import styled from 'styled-components/native'
import { AUTH_TOKEN } from '../constants'

const Container = styled(View)`
  flex: 1;
  justify-content: center;
`

const LoadingAuthScreen = (props) => {
  const checkForToken = async () => {
    const userToken = await AsyncStorage.getItem(AUTH_TOKEN)
    props.navigation.navigate(userToken ? 'App' : 'Auth')
  }

  useEffect(() => {
    checkForToken()
  }, [])

  return (
    <Container>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </Container>
  )
}

LoadingAuthScreen.navigationOptions = {
  header: null,
}

export default LoadingAuthScreen
