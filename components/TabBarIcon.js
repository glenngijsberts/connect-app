import React from 'react'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../theme'

const TabBarIcon = ({ name, focused }) => (
  <Ionicons
    name={name}
    size={26}
    style={{ marginBottom: -3 }}
    color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
  />
)

TabBarIcon.propTypes = {
  name: PropTypes.string,
  focussed: PropTypes.bool,
}

export default TabBarIcon
