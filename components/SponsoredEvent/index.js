import React from 'react'
import PropTypes from 'prop-types'
import { Footnote, Paragraph } from '../../components/Text'
import styled from 'styled-components/native'
import { View, Image } from 'react-native'
import { color } from '../../theme'

const Event = styled(View)`
  border-bottom-width: 1px;
  border-color: ${color.greyLight};
  padding-top: 16px;
  padding-bottom: 16px;
`

const EventImage = styled(Image)`
  height: 180px;
  width: 100%;
  border-radius: 4px;
  margin-bottom: 16px;
`

const SponsoredEvent = ({ sponsoredEvents }) => {
  const [event] = sponsoredEvents
  return (
    <Event>
      <EventImage
        source={{
          uri:
            'https://i2.wp.com/wp.laravel-news.com/wp-content/uploads/2020/01/laracon-online.png?fit=2220%2C1125&ssl=1?resize=2200%2C1125',
        }}
      />
      <Paragraph style={{ fontWeight: 'bold', marginBottom: 8 }}>
        {event.title}
      </Paragraph>
      <Footnote>Gesponsord evenement</Footnote>
    </Event>
  )
}

SponsoredEvent.propTypes = {
  sponsoredEvents: PropTypes.array,
}

export default SponsoredEvent
