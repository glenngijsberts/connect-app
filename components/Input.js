import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { color } from '../theme'
import { TextInput } from 'react-native'
import Layout from '../theme/Layout'
import styled, { css } from 'styled-components/native'

const Input = styled(TextInput)`
  width: ${Layout.gridWidth}px;
  padding: 10px 16px;
  border-radius: 10px;
  border-width: 1px;
  height: 40px;
  font-size: 17px;
  color: ${color.black};
`

const InputWrapper = React.forwardRef(
  ({ children, variant, ...props }, ref) => {
    const [borderColor, setBorderColor] = useState(color.grey)

    return (
      <Input
        {...props}
        onFocus={() => setBorderColor(color.black)}
        onBlur={() => setBorderColor(color.grey)}
        placeholderTextColor={color.grey}
        style={{ borderColor }}
        ref={ref}
      />
    )
  }
)

InputWrapper.defaultProps = {}

export default InputWrapper
