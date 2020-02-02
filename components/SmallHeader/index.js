import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { Animated, Text } from 'react-native'
import { color } from '../../theme'

const Header = styled(Animated.View)`
  height: 44px;
  padding-left: 16px;
  padding-right: 16px;
  border-bottom-color: ${color.greyLight};
  border-bottom-width: 1px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const Title = styled(Text)`
  font-size: 17px;
  color: ${color.black};
  font-weight: 600;
`

const SmallHeader = ({ title, largeHeaderInView }) => {
  const [opacity] = useState(new Animated.Value(0))

  useEffect(() => {
    if (!largeHeaderInView) {
      return Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
      }).start()
    }

    return Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
    }).start()
  }, [largeHeaderInView])

  return (
    <Header
      style={{
        opacity,
      }}
    >
      <Title>{title}</Title>
    </Header>
  )
}

SmallHeader.propTypes = {
  title: PropTypes.string.isRequired,
  largeHeaderInView: PropTypes.bool,
}

export default SmallHeader
