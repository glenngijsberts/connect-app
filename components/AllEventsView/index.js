import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import SponsoredEvent from '../SponsoredEvent'
import EventBlock from '../EventBlock'
import AllEventsEmptyView from '../AllEventsEmptyView'
import styled from 'styled-components/native'
import { color } from '../../theme'
import Skeleton from './Skeleton'

const EventView = ({ loading, activeEvents, sponsoredEvents }) => {
  if (loading) return <Skeleton skeletons={['a', 'b', 'c', 'd', 'e', 'f']} />

  if (Boolean(activeEvents.length === 0 && sponsoredEvents.length === 0))
    return <AllEventsEmptyView />

  return (
    <View>
      {Boolean(sponsoredEvents.length) && (
        <SponsoredEvent sponsoredEvents={sponsoredEvents} />
      )}

      {activeEvents.map((event) => (
        <EventBlock
          key={event.id}
          title={event.title}
          description={event.description}
          date={event.startDate}
          image={''}
        />
      ))}
    </View>
  )
}

EventView.propTypes = {
  loading: PropTypes.bool,
  activeEvents: PropTypes.array,
  sponsoredEvents: PropTypes.array,
}

export default EventView
