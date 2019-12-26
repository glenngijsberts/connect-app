import React, { useState, useContext } from 'react'
import { View, SafeAreaView, Text, Image } from 'react-native'
import styled from 'styled-components/native'
import { Paragraph, SmallTitle, Footnote } from '../../components/Text'
import { spacing, color } from '../../theme'
import Button from '../../components/Button'
import Block from '../../components/Block'
import Layout from '../../theme/Layout'

const Container = styled(SafeAreaView)`
  flex: 1;
`
const CenterContent = styled(View)`
  align-items: center;
  text-align: center;
  padding-top: ${spacing[32]};
  width: ${Layout.gridWidth}px;
  margin: 0 auto;
`

const StyledImage = styled(Image)`
  width: 280px;
  height: 280px;
  max-width: ${Layout.gridWidth}px;
  margin: 0 auto;
`

const StyledButton = styled(Button)`
  width: 100%;
`

const RegisterCompleteScreen = ({ ...props }) => (
  <Container>
    <CenterContent>
      <Block marginBottom={24}>
        <StyledImage
          source={require('../../assets/images/undraw_registerComplete.png')}
        />
      </Block>

      <Block marginBottom={8}>
        <SmallTitle>Je profiel is aangemaakt!</SmallTitle>
      </Block>

      <Block marginBottom={24}>
        <Footnote center>
          Je profiel is aangemaakt en klaar om te gebruiken. Ga naar je profiel
          om meer informatie in te vullen zodat het matchen een stuk beter gaat!
        </Footnote>
      </Block>

      <StyledButton onPress={() => props.navigation.navigate('App')}>
        Naar mijn profiel
      </StyledButton>
    </CenterContent>
  </Container>
)

RegisterCompleteScreen.navigationOptions = {
  header: null,
  mode: 'modal',
}

export default RegisterCompleteScreen
