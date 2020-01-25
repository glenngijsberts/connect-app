import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView, View, ScrollView } from 'react-native'
import styled from 'styled-components/native'
import Layout from '../../theme/Layout'
import { color } from '../../theme'
import { withNavigation } from 'react-navigation'
import Slide from './Slide'

const Pagination = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${Layout.window.width};
  margin: 0 auto;
  position: absolute;
  bottom: 128px;
`

const Dot = styled(View)`
  width: 8px;
  height: 8px;
  background-color: ${(props) =>
    props.active ? color.primary : color.primaryLight};
  margin-right: 8px;
  margin-left: 8px;
  border-radius: 50px;
`

const Onboarding = (props) => {
  const ref = useRef()
  const [activeSlide, setActiveSlide] = useState(0)

  const handleActiveSlide = (event) => {
    const index = event.nativeEvent.contentOffset.x / 374
    setActiveSlide(Math.round(index))
  }

  const slides = [
    {
      source: require('../../assets/images/undraw_onboarding-1.png'),
      text: 'Maak zelf de keuze met wie je wel en niet wilt connecten',
      button: null,
    },
    {
      source: require('../../assets/images/undraw_onboarding-1.png'),
      text: 'Maak zelf de keuze met wie je wel en niet wilt connecten',
      button: null,
    },
    {
      source: require('../../assets/images/undraw_onboarding-1.png'),
      text: 'Maak zelf de keuze met wie je wel en niet wilt connecten',
      button: {
        label: 'Naar de app',
        onPress: () => props.navigation.navigate('Auth'),
      },
    },
  ]

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        ref={ref}
        onMomentumScrollBegin={handleActiveSlide}
        onMomentumScrollEnd={handleActiveSlide}
      >
        {slides.map(({ source, text, button }, index) => (
          <Slide
            source={source}
            text={text}
            button={button}
            key={index}
            active={index === activeSlide}
          />
        ))}
      </ScrollView>

      <Pagination>
        {slides.map((dot, index) => (
          <Dot key={index} active={index === activeSlide} />
        ))}
      </Pagination>
    </SafeAreaView>
  )
}

Onboarding.propTypes = {}

export default withNavigation(Onboarding)
