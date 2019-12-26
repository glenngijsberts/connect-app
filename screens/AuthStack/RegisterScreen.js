import React from 'react'
import { View, Image, TouchableOpacity, Text, SafeAreaView } from 'react-native'
import styled from 'styled-components/native'
import { APP_NAME } from '../../constants'
import { Footnote, SmallTitle } from '../../components/Text'
import { spacing, color } from '../../theme'
import Layout from '../../theme/Layout'
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
  width: ${Layout.gridWidth}px;
  margin: 0 auto;
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

const RegisterScreen = ({ ...props }) => (
  <Container>
    <TopContent>
      <CenterTitle>{APP_NAME}</CenterTitle>
      <CenterText>Dé app voor het netwerken op evenementen</CenterText>

      <StyledImage
        source={require('../../assets/images/undraw_register.png')}
      />
    </TopContent>

    <BottomContent>
      <LinkedInButton variant="linkedIn">
        Registreren met LinkedIn
      </LinkedInButton>
      <EmailButton
        onPress={() => props.navigation.navigate('RegisterInfoScreen')}
      >
        Registreren met e-mail
      </EmailButton>

      <LoginLink>
        {/* Keep the space at the end */}
        <Footnote>Heb je al een profiel? </Footnote>

        <LoginLinkButton onPress={() => props.navigation.navigate('Login')}>
          <LoginLinkButtonLabel>Inloggen</LoginLinkButtonLabel>
        </LoginLinkButton>
      </LoginLink>
    </BottomContent>
  </Container>
)

RegisterScreen.navigationOptions = {
  title: 'Registreren',
}

export default RegisterScreen
