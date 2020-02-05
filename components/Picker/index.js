import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { color } from '../../theme'
import RNPickerSelect from 'react-native-picker-select'

const Picker = ({ items, onSelect, placeholder }) => (
  <RNPickerSelect
    placeholder={{
      label: placeholder,
      value: null,
    }}
    style={{
      ...pickerSelectStyles,
    }}
    onValueChange={(value) => onSelect(value)}
    items={items}
  />
)

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 17,
    paddingVertical: 10,
    height: 40,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: color.grey,
    borderRadius: 8,
    color: color.black,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
})

Picker.defaultProps = {
  placeholder: 'Selecteer een optie',
}

Picker.propTypes = {
  items: PropTypes.array,
  placeholder: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
}

export default Picker
