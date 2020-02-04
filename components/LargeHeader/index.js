import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { View, Text, TouchableOpacity } from 'react-native'
import { color } from '../../theme'
import { Ionicons } from '@expo/vector-icons'

const Header = styled(View)`
  height: ${(props) => (props.withSmallHeader ? 52 : 96)};
  padding-left: 16px;
  padding-right: 16px;
  border-bottom-color: ${color.greyLight};
  border-bottom-width: 1px;
  padding-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`
const Title = styled(Text)`
  font-size: 34px;
  color: ${color.black};
  font-weight: bold;
`

const AddEventIcon = styled(TouchableOpacity)``

const LargeHeader = ({ title, withSmallHeader, withIcon }) => (
  <Header withSmallHeader={withSmallHeader}>
    <Title>{title}</Title>

    {withIcon && (
      <AddEventIcon onPress={withIcon.onPress}>
        <Ionicons name={withIcon.name} size={26} color={color.primary} />
      </AddEventIcon>
    )}
  </Header>
)

LargeHeader.defaultProps = {
  withSmallHeader: false,
}

LargeHeader.propTypes = {
  title: PropTypes.string.isRequired,
  withSmallHeader: PropTypes.bool.isRequired,
}

export default LargeHeader
