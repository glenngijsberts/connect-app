import React from 'react'
import PropTypes from 'prop-types'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

const DatePickerModal = ({
  show,
  onConfirm,
  onCancel,
  title,
  confirmLabel,
  cancelLabel,
  ...props
}) => (
  <DateTimePickerModal
    isVisible={show}
    mode="date"
    onConfirm={onConfirm}
    onCancel={onCancel}
    headerTextIOS={title}
    confirmTextIOS={confirmLabel}
    cancelTextIOS={cancelLabel}
    {...props}
  />
)

DatePickerModal.defaultProps = {
  confirmLabel: 'Aanpassen',
  cancelLabel: 'Annuleren',
}

DatePickerModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
}

export default DatePickerModal
