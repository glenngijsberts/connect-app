import React from 'react'
import { Text } from 'react-native'

export function MonoText({ style, ...props }) {
  return <Text {...props} style={[style, { fontFamily: 'space-mono' }]} />
}
