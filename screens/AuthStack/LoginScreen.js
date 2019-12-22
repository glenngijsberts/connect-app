import React from 'react'
import { View, Image, TouchableOpacity, Text, SafeAreaView } from 'react-native'
import styled from 'styled-components/native'
import { APP_NAME } from '../../constants'
import { Footnote, SmallTitle } from '../../components/Text'
import { spacing, color } from '../../theme'
import Button from '../../components/Button'

const Container = styled(SafeAreaView)`
  flex: 1;
`
const TopContent = styled(View)`
  flex: 1;
  padding-top: ${spacing[32]};
  align-items: center;
`

const BottomContent = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`

const StyledImage = styled(Image)`
  width: 240px;
  height: 240px;
`

const CenterTitle = styled(SmallTitle)`
  margin-bottom: ${spacing[8]};
  text-align: center;
`

const CenterText = styled(Footnote)`
  text-align: center;
  margin-bottom: ${spacing[32]};
`

const LinkedInButton = styled(Button)`
  margin-bottom: ${spacing[8]};
`

const EmailButton = styled(Button)`
  margin-bottom: ${spacing[24]};
`

const LoginLink = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: ${spacing[16]};
`
const LoginLinkButton = styled(TouchableOpacity)``
const LoginLinkButtonLabel = styled(Text)`
  color: ${color.primary};
`

const LoginScreen = () => (
  <Container>
    <TopContent></TopContent>

    <BottomContent></BottomContent>
  </Container>
)

LoginScreen.navigationOptions = {
  title: 'Inloggen',
  headerTintColor: color.black,
  headerLeftContainerStyle: {
    marginLeft: 16,
  },
}

export default LoginScreen
