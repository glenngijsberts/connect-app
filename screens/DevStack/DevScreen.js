import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  Text,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native'
import { AUTH_TOKEN } from '../../constants'
import styled from 'styled-components'

const LogoutButton = styled(TouchableOpacity)`
  background-color: orangered;
  width: 80%;
  padding: 12px 8px;
  margin: 24px auto;
`

const DevScreen = (props) => {
  const [token, setToken] = useState('')

  useEffect(() => {
    async function getToken() {
      const tokenFromStorage = await AsyncStorage.getItem(AUTH_TOKEN)
      setToken(tokenFromStorage)
    }

    getToken()
  }, [])

  const handleLogout = async () => {
    await AsyncStorage.removeItem(AUTH_TOKEN)
    props.navigation.navigate('Auth')
  }

  return (
    <SafeAreaView>
      <Text>{token}</Text>

      <LogoutButton onPress={handleLogout}>
        <Text>Logout</Text>
      </LogoutButton>
    </SafeAreaView>
  )
}

DevScreen.navigationOptions = {
  header: null,
}

export default DevScreen
