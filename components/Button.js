import React from 'react'
import PropTypes from 'prop-types'
import { color } from '../theme'
import { TouchableOpacity, Text } from 'react-native'
import styled, { css } from 'styled-components/native'

const Button = styled(TouchableOpacity)`
  padding: 12px 16px;
  border-radius: 8px;
  height: 48px;
  justify-content: center;

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
  font-size: 15px;
`

const ButtonWrapper = ({ children, variant, ...props }) => (
  <Button variant={variant} {...props}>
    <Label>{children}</Label>
  </Button>
)

ButtonWrapper.defaultProps = {
  variant: 'primary',
}

ButtonWrapper.propTypes = {
  variant: PropTypes.string,
}

export default ButtonWrapper
