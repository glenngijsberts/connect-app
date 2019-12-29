import React, { useContext } from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Alert,
} from 'react-native'
import styled from 'styled-components/native'
import { APP_NAME } from '../../constants'
import { Footnote, SmallTitle } from '../../components/Text'
import { spacing, color } from '../../theme'
import { AuthSession } from 'expo'
import Layout from '../../theme/Layout'
import Button from '../../components/Button'
import { client_id, client_secret, linkedinState } from '../../config'
import axios from 'axios'
import { useMutation } from '@apollo/react-hooks'
import START_SIGNUP_WITH_LINKEDIN from '../../graphql-mutations/startSignupWithLinkedIn'
import RegisterContext from '../../context/RegisterContext'

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

const RegisterScreen = ({ ...props }) => {
  const { setUserPhoto, setUser, setIsLinkedInUser } = useContext(
    RegisterContext
  )
  const [startSignup] = useMutation(START_SIGNUP_WITH_LINKEDIN)

  const handleLinkedInLogin = async () => {
    /*
      Open LinkedIn inside a web-browser that can
      handle oAuth authentication
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
      At this point the user is authenticated by LinkedIn
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
          the access_token to our graphql server
        */
        const {
          data: { startSignupWithLinkedIn = {} },
        } = await startSignup({
          variables: {
            access_token,
          },
        })

        const {
          errors = [],
          token,
          firstName,
          lastName,
          photo,
          email,
        } = startSignupWithLinkedIn

        if (errors.length) {
          return Alert.alert('Foutmelding', errors[0].message)
        }

        if (token) {
          Alert.alert(
            'Aanmelden gelukt',
            'Het blijkt dat je al een account hebt. Je bent ingelogd'
          )
          return props.navigation.navigate('App')
        }

        setUser({
          name: `${firstName} ${lastName}`,
          email,
          tagline: '',
          website: '',
          phone: '',
        })
        setUserPhoto(photo)
        setIsLinkedInUser(true)

        return props.navigation.navigate('RegisterInfoScreen')
      })
      .catch((error) => {
        return Alert.alert(
          'Foutmelding',
          'Het is niet gelukt om je LinkedIn profiel op te halen! Dit heeft te maken met de verbinding tussen de applicatie en LinkedIn'
        )
      })
  }

  return (
    <Container>
      <TopContent>
        <CenterTitle>{APP_NAME}</CenterTitle>
        <CenterText>Dé app voor het netwerken op evenementen</CenterText>

        <StyledImage
          source={require('../../assets/images/undraw_register.png')}
        />
      </TopContent>

      <BottomContent>
        <LinkedInButton
          onPress={() => handleLinkedInLogin()}
          variant="linkedIn"
        >
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
}

RegisterScreen.navigationOptions = {
  title: 'Registreren',
}

export default RegisterScreen
