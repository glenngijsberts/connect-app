import React from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'
import { color } from '../theme'

export function MonoText({ style, ...props }) {
  return <Text {...props} style={[style, { fontFamily: 'space-mono' }]} />
}

const StyledFootnote = styled(Text)`
  color: ${(props) => (props.variant === 'alt' ? color.grey : color.black)};
  font-size: 13px;
  font-weight: 400;
  font-family: 'System';
  line-height: 18px;
  text-align: ${(props) => (props.center ? 'center' : 'left')};
`

export const Footnote = ({ ...props }) => <StyledFootnote {...props} />

const StyledParagraph = styled(Text)`
  color: ${color.black};
  font-size: 17px;
  font-weight: 400;
  font-family: 'System';
  line-height: 22px;
`

export const Paragraph = ({ ...props }) => <StyledParagraph {...props} />

const StyledSmallTitle = styled(Text)`
  font-size: 22px;
  font-weight: 700;
  color: ${color.black};
  font-family: 'System';
`

export const SmallTitle = ({ ...props }) => <StyledSmallTitle {...props} />
