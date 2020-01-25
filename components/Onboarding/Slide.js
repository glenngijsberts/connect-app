import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import Button from '../Button'
import Layout from '../../theme/Layout'
import { SmallTitle } from '../Text'
import { View, Image, Animated } from 'react-native'

const SlideContainer = styled(View)`
  flex: 1;
  width: ${Layout.window.width};
`

const TopContent = styled(View)`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  max-width: ${Layout.gridWidthSmall}px;
  margin: 0 auto;
`

const BottomContent = styled(View)`
  flex: 1;
  justify-content: flex-end;
  width: 100%;
  max-width: ${Layout.gridWidthSmall}px;
  margin: 0 auto;
`

const StyledSmallTitle = styled(SmallTitle)`
  margin-top: 32px;
  text-align: center;
`

const StyledImage = styled(Image)`
  width: 320px;
  height: 190px;
`

const GoToAppButton = styled(Button)`
  margin-bottom: 16px;
`

const Slide = ({ source, text, button, active }) => {
  const [buttonFade] = useState(new Animated.Value(0))

  useEffect(() => {
    if (active) {
      return Animated.timing(buttonFade, {
        toValue: 1,
        duration: 300,
      }).start()
    }

    return Animated.timing(buttonFade, {
      toValue: 0,
      duration: 150,
    }).start()
  }, [active])

  return (
    <SlideContainer>
      <TopContent>
        <StyledImage source={source} />
        <StyledSmallTitle>{text}</StyledSmallTitle>
      </TopContent>
      <BottomContent>
        {button && (
          <Animated.View
            style={{
              opacity: buttonFade,
            }}
          >
            <GoToAppButton onPress={button.onPress}>
              {button.label}
            </GoToAppButton>
          </Animated.View>
        )}
      </BottomContent>
    </SlideContainer>
  )
}

Slide.propTypes = {
  button: PropTypes.shape({
    onPress: PropTypes.func,
    label: PropTypes.string,
  }),
  active: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  source: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default Slide
