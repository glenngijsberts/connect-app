import React, { useState, useRef } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native'
import styled from 'styled-components/native'
import { Footnote } from '../../components/Text'
import { spacing, color } from '../../theme'
import Layout from '../../theme/Layout'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Block from '../../components/Block'
import DividerTitle from '../../components/DividerTitle'
import * as WebBrowser from 'expo-web-browser'
import { useMutation } from '@apollo/react-hooks'
import LOGIN_WITH_EMAIL from '../../graphql-mutations/login'

const Container = styled(SafeAreaView)`
  flex: 1;
`
const TopContent = styled(View)`
  flex: 1;
  padding-top: ${spacing[32]};
  width: ${Layout.gridWidth}px;
  margin: 0 auto;
`

const BottomContent = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`

const LoginButton = styled(Button)`
  margin-bottom: ${spacing[24]};
  align-items: center;
`

const RegisterLink = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: ${spacing[16]};
`
const RegisterLinkButton = styled(TouchableOpacity)``
const RegisterLinkButtonLabel = styled(Text)`
  color: ${color.primary};
`

const PrivacyStatement = styled(View)`
  align-items: center;
  max-width: ${Layout.gridWidth}px;
  margin-bottom: ${spacing[32]};
`

const PrivacyLink = styled(Text)`
  font-size: 13px;
  color: ${color.primary};
`

const ErrorText = styled(Footnote)`
  text-align: center;
  color: ${color.danger};
  max-width: ${Layout.gridWidth}px;
`

function handlePrivacyStatement() {
  WebBrowser.openBrowserAsync('https://www.sqits.nl')
}

const LoginScreen = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([])
  const [user, setUser] = useState(null)
  const passwordRef = useRef()
  const [login] = useMutation(LOGIN_WITH_EMAIL, {
    variables: {
      email,
      password,
    },
  })

  const handleLoginWithEmail = async () => {
    setErrors([])
    setUser(null)
    setLoading(true)

    if (!email || !password) {
      setLoading(false)

      return setErrors([
        {
          code: 424,
          message: 'Zorg dat je zowel een e-mailadres als wachtwoord opgeeft',
        },
      ])
    }

    const {
      data: { loginWithEmail = {} },
    } = await login()

    const { errors = [], user = {}, token } = loginWithEmail

    if (errors.length > 0) {
      setLoading(false)
      return setErrors(errors)
    }

    setUser({ ...user, token })
    setLoading(false)
  }

  return (
    <Container>
      <TopContent>
        <Block marginBottom={16}>
          <Input
            placeholder="E-mailadres"
            value={email}
            onChangeText={(value) => setEmail(value)}
            keyboardType="email-address"
            onSubmitEditing={() => passwordRef.current.focus()}
            blurOnSubmit={false}
          />
        </Block>

        <Block marginBottom={24}>
          <Input
            placeholder="Wachtwoord"
            value={password}
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
            keyboardType="email-address"
            ref={passwordRef}
          />
        </Block>

        {Boolean(errors.length) && (
          <Block marginBottom={24}>
            <ErrorText>{errors[0].message}</ErrorText>
          </Block>
        )}

        {Boolean(user) && (
          <Block marginBottom={24}>
            <Text>{JSON.stringify(user)}</Text>
          </Block>
        )}

        <LoginButton onPress={handleLoginWithEmail}>
          {loading ? <ActivityIndicator color={color.white} /> : 'Inloggen'}
        </LoginButton>

        <Block marginBottom={24}>
          <DividerTitle>of</DividerTitle>
        </Block>

        <Button variant="linkedIn">Inloggen met LinkedIn</Button>
      </TopContent>

      <BottomContent>
        <PrivacyStatement>
          <Footnote>De gebruikersvoorwaarden en het privacy statement</Footnote>
          <TouchableOpacity onPress={handlePrivacyStatement}>
            <PrivacyLink>zijn hier terug te vinden</PrivacyLink>
          </TouchableOpacity>
        </PrivacyStatement>

        <RegisterLink>
          {/* Keep the space at the end */}
          <Footnote>Nog geen profiel? </Footnote>

          <RegisterLinkButton onPress={() => props.navigation.goBack()}>
            <RegisterLinkButtonLabel>Registreren</RegisterLinkButtonLabel>
          </RegisterLinkButton>
        </RegisterLink>
      </BottomContent>
    </Container>
  )
}

LoginScreen.navigationOptions = {
  title: 'Inloggen',
  headerTintColor: color.black,
  headerLeftContainerStyle: {
    marginLeft: 16,
  },
}

export default LoginScreen
