import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { color } from '.'

const headerBack = {
  headerBackImage: () => <Ionicons name="ios-arrow-back" size={28} />,
  headerStyle: {
    borderBottomColor: color.greyLight,
    borderBottomWidth: 1,
  },
  headerLeftContainerStyle: {
    marginLeft: 16,
  },
}

export default headerBack
