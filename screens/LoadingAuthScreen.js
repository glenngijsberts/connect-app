import React, { useState, useEffect } from 'react'
import { View, ActivityIndicator, StatusBar, AsyncStorage } from 'react-native'
import styled from 'styled-components/native'
import { AUTH_TOKEN } from '../constants'
import Onboarding from '../components/Onboarding'

const Container = styled(View)`
  flex: 1;
  justify-content: center;
`

const LoadingAuthScreen = (props) => {
  const [onBoarded, setOnBoarded] = useState(true)

  const checkForToken = async () => {
    const userToken = await AsyncStorage.getItem(AUTH_TOKEN)
    props.navigation.navigate(userToken ? 'App' : 'Auth')
  }

  const setIsNotOnboarded = () => setOnBoarded(false)

  useEffect(() => {
    const handleScreen = async () => {
      const isOnBoarded = await AsyncStorage.getItem('IS_ONBOARDED')

      if (isOnBoarded) {
        return checkForToken()
      }

      setIsNotOnboarded()
    }

    handleScreen()
  }, [])

  return (
    <>
      {onBoarded ? (
        <>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </>
      ) : (
        <Onboarding />
      )}
    </>
  )
}

LoadingAuthScreen.navigationOptions = {
  header: null,
}

export default LoadingAuthScreen
