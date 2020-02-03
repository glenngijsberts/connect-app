import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { View } from 'react-native'
import { Footnote, Paragraph } from '../../components/Text'
import { color } from '../../theme'

const EventContainer = styled(View)`
  padding-top: 16px;
  padding-bottom: 16px;
  width: 100%;
  background-color: white;
  border-bottom-width: 1px;
  border-color: ${color.greyLight};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Details = styled(View)``

const Image = styled(View)`
  width: 80px;
  height: 80px;
  background-color: red;
  border-radius: 4px;
`

const EventBlock = ({ title, date, description, image }) => (
  <EventContainer>
    <Details>
      <Paragraph style={{ fontWeight: 'bold', marginBottom: 8 }}>
        {title}
      </Paragraph>
      <Paragraph style={{ marginBottom: 8, maxWidth: 240 }}>
        {description}
      </Paragraph>
      <Footnote variant="alt">{date}</Footnote>
    </Details>
    <Image />
  </EventContainer>
)

EventBlock.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
}

export default EventBlock
