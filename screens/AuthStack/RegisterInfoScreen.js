import React, { useState, useRef, useContext } from 'react'
import {
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from 'react-native'
import styled from 'styled-components/native'
import { Paragraph, SmallTitle, Footnote } from '../../components/Text'
import { spacing, color } from '../../theme'
import Button from '../../components/Button'
import Layout from '../../theme/Layout'
import Block from '../../components/Block'
import Input from '../../components/Input'
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

const ErrorText = styled(Footnote)`
  color: ${color.danger};
`

const RegisterInfoScreen = ({ ...props }) => {
  const { user, setUser } = useContext(RegisterContext)

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [displayTitle, setDisplayTitle] = useState(user.displayTitle)
  const [website, setWebsite] = useState(user.website)
  const [phone, setPhone] = useState(user.phone)
  const [error, setError] = useState(null)

  const emailRef = useRef()
  const displayTitleRef = useRef()
  const websiteRef = useRef()
  const phoneRef = useRef()

  const handleNextStep = () => {
    setError(null)

    if (!name || !email) {
      return setError('Zorg dat je alle verplichte velden hebt ingevuld!')
    }

    // Add these details to a global state or smth

    setUser({
      name,
      email,
      displayTitle,
      phone,
      website,
    })

    props.navigation.navigate('RegisterPhotoScreen')
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <TopContent>
          <ScreenTitle>Persoonlijke gegevens</ScreenTitle>
          <ScreenDescription>
            Graag zouden we wat gegevens van je willen hebben.
          </ScreenDescription>

          {error && (
            <Block marginBottom={16}>
              <ErrorText>{error}</ErrorText>
            </Block>
          )}

          <Block marginBottom={16}>
            <Input
              placeholder="Volledige naam"
              value={name}
              onChangeText={(value) => setName(value)}
              keyboardType="default"
              onSubmitEditing={() => emailRef.current.focus()}
              blurOnSubmit={false}
              required
            />
          </Block>

          <Block marginBottom={16}>
            <Input
              placeholder="E-mailadres"
              value={email}
              onChangeText={(value) => setEmail(value)}
              keyboardType="email-address"
              ref={emailRef}
              onSubmitEditing={() => displayTitleRef.current.focus()}
              blurOnSubmit={false}
              required
            />
          </Block>

          <Block marginBottom={16}>
            <Input
              placeholder="Kopregel"
              value={displayTitle}
              onChangeText={(value) => setDisplayTitle(value)}
              keyboardType="default"
              ref={displayTitleRef}
              onSubmitEditing={() => websiteRef.current.focus()}
              blurOnSubmit={false}
            />
          </Block>

          <Block marginBottom={16}>
            <Input
              placeholder="Website"
              value={website}
              onChangeText={(value) => setWebsite(value)}
              keyboardType="url"
              ref={websiteRef}
              onSubmitEditing={() => phoneRef.current.focus()}
              blurOnSubmit={false}
            />
          </Block>

          <Block marginBottom={24}>
            <Input
              placeholder="Telefoonnummer"
              value={phone}
              onChangeText={(value) => setPhone(value)}
              keyboardType="phone-pad"
              ref={phoneRef}
              onSubmitEditing={() => Keyboard.dismiss()}
            />
          </Block>

          <Button onPress={() => handleNextStep()}>Volgende stap</Button>
        </TopContent>
      </Container>
    </TouchableWithoutFeedback>
  )
}

RegisterInfoScreen.navigationOptions = {
  title: 'Stap 1',
  headerTintColor: color.black,
  headerLeftContainerStyle: {
    marginLeft: 16,
  },
}

export default RegisterInfoScreen
