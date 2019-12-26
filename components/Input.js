import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { color, spacing } from '../theme'
import { TextInput, View, Text } from 'react-native'
import styled from 'styled-components/native'

const Holder = styled(View)`
  width: 100%;
`

const Input = styled(TextInput)`
  padding: 10px 16px;
  border-radius: 10px;
  border-width: 1px;
  height: 40px;
  font-size: 17px;
  color: ${color.black};
`

const Required = styled(Text)`
  color: ${color.danger};
  position: absolute;
  right: ${spacing[16]};
  top: 14px;
`

const InputWrapper = React.forwardRef(
  ({ children, variant, required, ...props }, ref) => {
    const [borderColor, setBorderColor] = useState(color.grey)

    return (
      <Holder>
        <Input
          {...props}
          onFocus={() => setBorderColor(color.black)}
          onBlur={() => setBorderColor(color.grey)}
          placeholderTextColor={color.grey}
          style={{ borderColor }}
          ref={ref}
        />
        {required && <Required>*</Required>}
      </Holder>
    )
  }
)

InputWrapper.defaultProps = {
  required: false,
}

export default InputWrapper
