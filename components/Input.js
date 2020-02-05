import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { color, spacing } from '../theme'
import { TextInput, View, Text, ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'

const Holder = styled(View)`
  width: 100%;
`

const Input = styled(TextInput)`
  padding: 10px 16px;
  border-radius: 8px;
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

const Loader = styled(ActivityIndicator)`
  position: absolute;
  right: ${spacing[16]};
  top: 9.5;
`

const InputWrapper = React.forwardRef(
  ({ children, variant, required, loading, ...props }, ref) => {
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
        {loading && <Loader color={color.primary} />}
      </Holder>
    )
  }
)

InputWrapper.defaultProps = {
  required: false,
}

export default InputWrapper
