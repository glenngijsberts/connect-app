import React, { useState, useContext, useEffect } from 'react'
import {
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native'
import styled from 'styled-components/native'
import { Paragraph, SmallTitle } from '../../components/Text'
import { spacing, color } from '../../theme'
import Button from '../../components/Button'
import Layout from '../../theme/Layout'
import RegisterContext from '../../context/RegisterContext'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

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

const StyledPhoto = styled(Image)`
  width: 100px;
  height: 100px;
  margin: 0 auto;
  border-radius: 50;
  margin-bottom: ${spacing[24]};
`

const ImagePickButton = styled(TouchableOpacity)`
  align-items: center;
  margin-bottom: ${spacing[24]};
`

const ImagePickLabel = styled(Text)`
  color: ${color.primary};
`

const RegisterPhotoScreen = ({ ...props }) => {
  const [photo, setPhoto] = useState(null)
  const { user, setUserPhoto } = useContext(RegisterContext)

  const getPermissionAsync = async () => {
    /*
      If we want to create android app we should include here a fix
      https://docs.expo.io/versions/latest/sdk/imagepicker/
    */
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)

    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!')
    }
  }

  const pickImage = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!cancelled) {
      setPhoto(uri)
    }
  }

  useEffect(() => {
    getPermissionAsync()
  }, [])

  const handleNextPhoto = () => {
    if (!photo) {
      return props.navigation.navigate('RegisterPasswordScreen')
    }

    /*
      Need to find a way to store photo's from
      device into database
    */
    setUserPhoto(photo)

    return props.navigation.navigate('RegisterPasswordScreen')
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <TopContent>
          <ScreenTitle>Kies een foto</ScreenTitle>
          <ScreenDescription>
            Een foto zorgt voor vertrouwen bij andere gebruikers.
          </ScreenDescription>

          {user.userPhoto && !photo && (
            <StyledPhoto
              source={{
                uri: user.userPhoto,
              }}
            />
          )}

          {photo && (
            <StyledPhoto
              source={{
                uri: photo,
              }}
            />
          )}

          {/* set this active when there is a solution for storing photos
            <ImagePickButton onPress={pickImage}>
          */}
          <ImagePickButton onPress={null}>
            <ImagePickLabel>Kies een foto</ImagePickLabel>
          </ImagePickButton>

          <Button onPress={() => handleNextPhoto()}>Volgende stap</Button>
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
