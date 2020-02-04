import React from 'react'
import { Text } from 'react-native'
import headerBack from '../../theme/header'

const AddEventScreen = () => {
  return <Text>Test</Text>
}

AddEventScreen.navigationOptions = {
  title: 'Evenement toevoegen',
  ...headerBack,
}

export default AddEventScreen
