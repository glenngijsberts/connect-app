import React, { useState, useRef, useContext } from 'react'
import {
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
} from 'react-native'
import styled from 'styled-components/native'
import { Paragraph, SmallTitle, Footnote } from '../../components/Text'
import { spacing, color } from '../../theme'
import Button from '../../components/Button'
import Layout from '../../theme/Layout'
import Block from '../../components/Block'
import Input from '../../components/Input'
import RegisterContext from '../../context/RegisterContext'
import SIGNUP from '../../graphql-mutations/signup'
import { useMutation } from '@apollo/react-hooks'
import { AUTH_TOKEN } from '../../constants'
import headerBack from '../../theme/header'

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

const ErrorText = styled(Footnote)`
  color: ${color.danger};
`

const RegisterPasswordScreen = ({ ...props }) => {
  const { user, setUserPassword, clear } = useContext(RegisterContext)
  const { isLinkedInUser } = user

  console.log(user)

  const [password, setPassword] = useState(user.userPassword)
  const [passwordConfirm, setPasswordConfirm] = useState(user.userPassword)
  const [error, setError] = useState(null)

  const passwordConfirmRef = useRef()

  const [signup] = useMutation(SIGNUP)

  const handleNextStep = async () => {
    const { data } = await signup({
      variables: {
        name: user.name,
        email: user.email,
        displayTitle: user.displayTitle,
        website: user.website,
        phone: user.phone,
        photo: user.userPhoto,
        password: (!user.isLinkedInUser && password) || null,
        isLinkedInUser: user.isLinkedInUser,
      },
    })

    clear()

    /*
      At this point the user is registered and we can
      set the api token. After that we show the Register
      Complete modalscreen.
    */
    await AsyncStorage.setItem(AUTH_TOKEN, data.signup.token)
    props.navigation.navigate('RegisterComplete')
  }

  const checkForPassword = () => {
    setError(null)

    if (!password || !passwordConfirm) {
      return setError('Zorg dat je een geldig wachtwoord invult')
    }

    if (password.length < 6) {
      return setError('Zorg dat je wachtwoord minimaal 6 tekens bevat')
    }

    if (password !== passwordConfirm) {
      return setError('De twee ingevulde wachtwoorden komen niet overeen')
    }

    handleNextStep()
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <TopContent>
          <ScreenTitle>Wachtwoord</ScreenTitle>
          <ScreenDescription>
            {isLinkedInUser
              ? 'Vanaf nu kan je LinkedIn gebruiken om je aan te melden. Je hebt geen wachtwoord nodig!'
              : 'Kies zorgvuldig een wachtwoord. Vertel je wachtwoord nooit aan iemand!'}
          </ScreenDescription>

          {error && (
            <Block marginBottom={16}>
              <ErrorText>{error}</ErrorText>
            </Block>
          )}

          {!isLinkedInUser && (
            <>
              <Block marginBottom={16}>
                <Input
                  placeholder="Wachtwoord"
                  value={password}
                  onChangeText={(value) => {
                    setPassword(value)
                    setUserPassword(value)
                  }}
                  keyboardType="default"
                  onSubmitEditing={() => passwordConfirmRef.current.focus()}
                  blurOnSubmit={false}
                  secureTextEntry={true}
                  required
                />
              </Block>

              <Block marginBottom={24}>
                <Input
                  placeholder="Herhaal wachtwoord"
                  value={passwordConfirm}
                  onChangeText={(value) => setPasswordConfirm(value)}
                  keyboardType="default"
                  secureTextEntry={true}
                  required
                />
              </Block>
            </>
          )}

          <Button
            onPress={() =>
              isLinkedInUser ? handleNextStep() : checkForPassword()
            }
          >
            Profiel aanmaken
          </Button>

          <Block marginTop={24}>
            <Footnote variant="alt">
              Met het aanmaken van een profiel ga je akkoord met de algemene
              voorwaarden en de privacy statement.
            </Footnote>
          </Block>
        </TopContent>
      </Container>
    </TouchableWithoutFeedback>
  )
}

RegisterPasswordScreen.navigationOptions = {
  title: 'Stap 3',
  ...headerBack,
}

export default RegisterPasswordScreen
