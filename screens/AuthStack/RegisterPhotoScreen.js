import React, { useState, useContext } from 'react'
import {
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from 'react-native'
import styled from 'styled-components/native'
import { Paragraph, SmallTitle } from '../../components/Text'
import { spacing, color } from '../../theme'
import Button from '../../components/Button'
import Layout from '../../theme/Layout'
import RegisterContext from '../../context/RegisterContext'

const Container = styled(SafeAreaView)`
  flex: 1;
`
const TopContent = styled(View)`
  flex: 1;
  padding-top: ${spacing[32]};
  max-width: ${Layout.gridWidthSmall}px;
  margin: 0 auto;
`

const ScreenTitle = styled(SmallTitle)`
  margin-bottom: ${spacing[8]};
`

const ScreenDescription = styled(Paragraph)`
  margin-bottom: ${spacing[24]};
`

const RegisterPhotoScreen = ({ ...props }) => {
  const [photo, setPhoto] = useState('')
  const { user, setUserPhoto } = useContext(RegisterContext)

  // Handle photo

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <TopContent>
          <ScreenTitle>Kies een foto</ScreenTitle>
          <ScreenDescription>
            Een foto zorgt voor vertrouwen bij andere gebruikers.
          </ScreenDescription>
          <Text>{user.userPhoto}</Text>
          <Button
            onPress={() => props.navigation.navigate('RegisterPasswordScreen')}
          >
            Volgende stap
          </Button>
        </TopContent>
      </Container>
    </TouchableWithoutFeedback>
  )
}

RegisterPhotoScreen.navigationOptions = {
  title: 'Stap 2',
  headerTintColor: color.black,
  headerLeftContainerStyle: {
    marginLeft: 16,
  },
}

export default RegisterPhotoScreen
