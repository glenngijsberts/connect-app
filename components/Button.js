import React from 'react'
import PropTypes from 'prop-types'
import { color } from '../theme'
import { TouchableOpacity, Text } from 'react-native'
import Layout from '../theme/Layout'
import styled, { css } from 'styled-components/native'

const Button = styled(TouchableOpacity)`
  width: ${Layout.gridWidth}px;
  padding: 12px 16px;
  border-radius: 4px;

  ${(props) =>
    props.variant === 'primary' &&
    css`
      background-color: ${color.primary};
      color: white;
    `};

  ${(props) =>
    props.variant === 'linkedIn' &&
    css`
      background-color: ${color.linkedIn};
      color: white;
    `};
`

const Label = styled(Text)`
  font-weight: 500;
  color: ${color.white};
  text-align: center;
`

const ButtonWrapper = ({ children, variant, ...props }) => (
  <Button variant={variant} {...props}>
    <Label>{children}</Label>
  </Button>
)

ButtonWrapper.defaultProps = {
  variant: 'primary',
}

export default ButtonWrapper
