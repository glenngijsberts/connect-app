import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { View, Text } from 'react-native'
import { color } from '../../theme'

const Header = styled(View)`
  height: ${(props) => (props.withSmallHeader ? 52 : 96)};
  padding-left: 16px;
  padding-right: 16px;
  border-bottom-color: ${color.greyLight};
  border-bottom-width: 1px;
  padding-bottom: 8px;
  display: flex;
  justify-content: flex-end;
`
const Title = styled(Text)`
  font-size: 34px;
  color: ${color.black};
  font-weight: bold;
`

const LargeHeader = ({ title, withSmallHeader }) => (
  <Header withSmallHeader={withSmallHeader}>
    <Title>{title}</Title>
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
