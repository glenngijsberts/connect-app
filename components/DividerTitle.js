import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components/native'
import { color } from '../theme'
import Layout from '../theme/Layout'

const Holder = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const Divider = styled(View)`
  border-bottom-color: ${color.primaryLight};
  border-bottom-width: 1px;
  width: ${Layout.gridWidth / 2 - 32}px;
`

const Title = styled(Text)`
  font-family: 'System';
  color: ${color.black};
  font-size: 13px;
`

const DividerTitleWrapper = (props) => (
  <Holder>
    <Divider />
    <Title>{props.children}</Title>
    <Divider />
  </Holder>
)

DividerTitleWrapper.defaultProps = {}

export default DividerTitleWrapper
