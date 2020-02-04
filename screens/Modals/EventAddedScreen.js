import React from 'react'
import { SafeAreaView, Text } from 'react-native'
import styled from 'styled-components/native'
import { color } from '../../theme'
import { Ionicons } from '@expo/vector-icons'

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: transparent;
`

const EventAdded = ({ ...props }) => (
  <Container>
    <Text>Event Added</Text>
  </Container>
)

EventAdded.navigationOptions = {
  mode: 'modal',
  headerStyle: {
    borderBottomColor: '#fff',
  },
  headerTintColor: color.black,
  headerLeftContainerStyle: {
    marginLeft: 16,
  },
  gestureEnabled: false,
  headerBackImage: () => <Ionicons name="ios-close" size={48} />,
}

export default EventAdded
