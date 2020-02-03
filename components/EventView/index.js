import React from 'react'
import PropTypes from 'prop-types'
import Skeleton from '../EventBlock/Skeleton'
import EventBlock from '../EventBlock'
import EventEmptyView from '../EventEmptyView'

const EventView = ({ loading, events }) => {
  if (loading) return <Skeleton skeletons={['a', 'b', 'c', 'd', 'e', 'f']} />

  if (Boolean(events.length === 0)) return <EventEmptyView />

  return events.map((event) => (
    <EventBlock
      key={event.id}
      title={event.title}
      description={event.description}
      date={event.startDate}
      image={''}
    />
  ))
}

EventView.propTypes = {
  loading: PropTypes.bool.isRequired,
  events: PropTypes.array,
}

export default EventView
