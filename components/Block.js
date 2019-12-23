import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'

const Block = styled(View)`
  margin-top: ${(props) => props.marginTop}px;
  margin-bottom: ${(props) => props.marginBottom}px;
`

const BlockWrapper = (props) => <Block {...props}>{props.children}</Block>

Block.defaultProps = {
  marginTop: 0,
  marginBottom: 0,
}

export default BlockWrapper
