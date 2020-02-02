import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { TouchableOpacity, View, Text } from 'react-native'
import { color } from '../../theme'

const Segment = styled(TouchableOpacity)`
  background-color: ${(props) => (props.active ? color.primary : color.white)};
  padding: 8px;
  flex: 1;
  border-width: 1px;
  border-color: ${color.primary};
  border-top-left-radius: ${({ first }) => (first ? 8 : 0)};
  border-top-right-radius: ${({ last }) => (last ? 8 : 0)};
  border-bottom-right-radius: ${({ last }) => (last ? 8 : 0)};
  border-bottom-left-radius: ${({ first }) => (first ? 8 : 0)};
`

const SegmentContainer = styled(View)`
  width: 100%;
  height: auto;
  padding: 8px 16px;
  display: flex;
  flex-direction: row;
`

const SegmentLabel = styled(Text)`
  font-size: 13px;
  color: ${(props) => (props.active ? color.white : color.black)};
  text-align: center;
  font-weight: 500;
`

const SegmentController = ({ active, setActive, controls }) => (
  <SegmentContainer>
    {controls.map((control, index) => (
      <Segment
        key={index}
        active={active === index}
        onPress={() => setActive(index)}
        first={index === 0}
        last={index === controls.length - 1}
      >
        <SegmentLabel active={active === index}>{control}</SegmentLabel>
      </Segment>
    ))}
  </SegmentContainer>
)

SegmentController.propTypes = {
  active: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  setActive: PropTypes.func,
  controls: PropTypes.array.isRequired,
}

export default SegmentController
