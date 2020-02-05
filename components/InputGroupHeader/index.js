import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { View, TouchableOpacity, Text } from 'react-native'
import { color } from '../../theme'
import { Paragraph } from '../Text'

const Header = styled(View)`
  border-color: ${color.greyLight};
  border-bottom-width: 1px;
  border-top-width: 1px;
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`

const Clear = styled(TouchableOpacity)``

const Label = styled(Text)`
  font-size: 17px;
  color: ${color.primary};
`

const InputGroupHeader = ({ onClear, label }) => (
  <Header>
    <Paragraph style={{ fontWeight: 'bold' }}>{label}</Paragraph>
    {onClear && (
      <Clear onPress={onClear}>
        <Label>Leegmaken</Label>
      </Clear>
    )}
  </Header>
)

InputGroupHeader.propTypes = {
  onClear: PropTypes.func,
  label: PropTypes.string.isRequired,
}

export default InputGroupHeader
