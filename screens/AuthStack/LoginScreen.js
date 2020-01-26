import React, { useState, useRef } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  AsyncStorage,
} from 'react-native'
import { AuthSession } from 'expo'
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
import LOGIN_WITH_LINKEDIN from '../../graphql-mutations/loginWithLinkedIn'
import { client_id, client_secret, linkedinState } from '../../config'
import axios from 'axios'
import { AUTH_TOKEN } from '../../constants'

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
  const passwordRef = useRef()
  const [loginLinkedIn] = useMutation(LOGIN_WITH_LINKEDIN)
  const [login] = useMutation(LOGIN_WITH_EMAIL, {
    variables: {
      email,
      password,
    },
  })

  const handleLinkedInLogin = async () => {
    /*
      Open LinkedIn inside a web-browser that can
      handle oAuth authentication. First we need to
      get a code to retrieve the basic info. This code
      can be used to get the access_token.
    */
    const redirectUrl = AuthSession.getRedirectUrl()

    const result = await AuthSession.startAsync({
      authUrl: `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${client_id}&redirect_uri=${encodeURIComponent(
        redirectUrl
      )}&state=${linkedinState}&scope=r_emailaddress,r_liteprofile`,
    })

    const { type, errorCode, params } = result

    /*
      All errors that users can get by cancel the flow on
      their own.
    */
    if (!type) return
    if (type === 'cancel') return
    if (type === 'error' && errorCode === 'login-declined') return
    if (type === 'success' && params.error === 'user_cancelled_login') return

    if (!params.code) {
      return Alert.alert(
        'Foutmelding',
        'Het is niet gelukt om je LinkedIn profiel op te halen! De verbinding met LinkedIn is tussentijds onderbroken'
      )
    }

    /*
      At this point the user basic info is granted by LinkedIn
      so we are able to get the access-token
    */
    const headers = {}
    headers['content-type'] = 'application/x-www-form-urlencoded'

    axios
      .post(
        `https://www.linkedin.com/oauth/v2/accessToken?client_id=${client_id}&client_secret=${client_secret}&grant_type=authorization_code&redirect_uri=${encodeURIComponent(
          redirectUrl
        )}&code=${params.code}`,
        {
          headers,
        }
      )
      .then(async (response) => {
        const { data = {} } = response

        if (!data.access_token) {
          return Alert.alert(
            'Foutmelding',
            'Het is niet gelukt om je LinkedIn profiel op te halen! Je persoonlijke LinkedIn code kon niet opgehaald worden'
          )
        }

        const { access_token } = data

        /*
          At this point we have the access_token from the user
          so we can retrieve his info (name, photo & email). We pass
          the access_token to our graphql server to get an api token
        */
        const {
          data: { loginWithLinkedIn },
        } = await loginLinkedIn({
          variables: {
            access_token,
          },
        })

        if (loginWithLinkedIn.errors.length > 0) {
          return Alert.alert('Foutmelding', loginWithLinkedIn.errors[0].message)
        }

        /*
          The user is logged in at this point so
          we save the api token in the AsyncStorage.
          After that we send the user to the app content.
        */
        await AsyncStorage.setItem(AUTH_TOKEN, loginWithLinkedIn.token)

        props.navigation.navigate('App')
      })
      .catch((error) => {
        // @TODO: Add sentry log
        return Alert.alert(
          'Foutmelding',
          'Het is niet gelukt om je met LinkedIn in te laten loggen. Probeer het opnieuw'
        )
      })
  }

  const handleLoginWithEmail = async () => {
    setErrors([])
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

    const { errors = [], token } = loginWithEmail

    if (errors.length > 0) {
      setLoading(false)
      return setErrors(errors)
    }

    setLoading(false)
    /*
      The user is logged in at this point so
      we save the api token in the AsyncStorage.
      After that we send the user to the app content.
    */
    await AsyncStorage.setItem(AUTH_TOKEN, loginWithLinkedIn.token)

    props.navigation.navigate('App')
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

        <LoginButton onPress={handleLoginWithEmail}>
          {loading ? <ActivityIndicator color={color.white} /> : 'Inloggen'}
        </LoginButton>

        <Block marginBottom={24}>
          <DividerTitle>of</DividerTitle>
        </Block>

        <Button variant="linkedIn" onPress={() => handleLinkedInLogin()}>
          Inloggen met LinkedIn
        </Button>
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
