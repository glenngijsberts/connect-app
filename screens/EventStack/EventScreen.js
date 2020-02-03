import React, { useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native'
import styled from 'styled-components/native'
import Layout from '../../theme/Layout'
import { color } from '../../theme'
import SegmentController from '../../components/SegmentController'
import LargeHeader from '../../components/LargeHeader'
import SmallHeader from '../../components/SmallHeader'
import { useQuery } from '@apollo/react-hooks'
import GET_VIEWER_EVENTS from '../../graphql-queries/getViewerEvents'
import GET_ACTIVE_EVENTS from '../../graphql-queries/getActiveEvents'
import EventView from '../../components/EventView'
import AllEventsView from '../../components/AllEventsView'
import EventCategoryCarousel from '../../components/EventCategoryCarousel'

const Container = styled(View)`
  width: ${Layout.gridWidth};
  margin: 0 auto;
`

const EventScreen = () => {
  const [active, setActive] = useState(0)
  const [eventCategory, setEventCategory] = useState(undefined)
  const [isRefetchingMyEvents, setIsRefetchingMyEvents] = useState(false)
  const [largeHeaderInView, setLargeHeaderInView] = useState(true)

  /*
    This will make sure that the small header will
    fade in when the large header is not in the view
  */
  const checkPosition = (event) => {
    if (event.nativeEvent.contentOffset.y > 35) {
      return setLargeHeaderInView(false)
    }

    setLargeHeaderInView(true)
  }

  /*
    MyEvents data
  */
  const { data = {}, loading: myEventsLoading, refetch, error } = useQuery(
    GET_VIEWER_EVENTS
  )
  const { viewer = {} } = data
  const { events: myEvents = [] } = viewer

  /*
    All events data
  */
  const {
    data: activeEventsData = {},
    loading: activeEventsLoading,
  } = useQuery(GET_ACTIVE_EVENTS, {
    variables: {
      category: eventCategory,
    },
  })
  const {
    data: sponsoredEventsData = {},
    loading: sponsoredEventsLoading,
  } = useQuery(GET_ACTIVE_EVENTS, {
    variables: {
      isSponsored: true,
      category: eventCategory,
    },
  })

  const allEventsLoading = activeEventsLoading || sponsoredEventsLoading
  const sponsoredEvents =
    (sponsoredEventsData && sponsoredEventsData.activeEvents) || []
  const activeEvents = (activeEventsData && activeEventsData.activeEvents) || []

  /*
    Pull to refresh for MyEvents
  */
  const refetchingMyEvents = async () => {
    setIsRefetchingMyEvents(true)

    try {
      refetch()
    } catch (e) {
      setIsRefetchingMyEvents(false)
    }

    setIsRefetchingMyEvents(false)
  }

  return (
    <SafeAreaView>
      <SmallHeader title="Evenementen" largeHeaderInView={largeHeaderInView} />

      <ScrollView
        onScroll={(event) => checkPosition(event)}
        scrollEventThrottle={32}
        style={{
          minHeight: Layout.window.height,
        }}
        refreshControl={
          active === 0 ? (
            <RefreshControl
              refreshing={isRefetchingMyEvents}
              onRefresh={refetchingMyEvents}
              tintColor={color.primaryLight}
            />
          ) : null
        }
      >
        <LargeHeader title="Evenementen" withSmallHeader={true} />

        <SegmentController
          active={active}
          setActive={setActive}
          controls={['Mijn evenementen', 'Evenementen']}
        />

        {active === 0 && (
          <Container style={{ paddingTop: 16 }}>
            <EventView loading={myEventsLoading} events={myEvents} />
          </Container>
        )}

        {active === 1 && (
          <>
            <EventCategoryCarousel
              eventCategory={eventCategory}
              setEventCategory={setEventCategory}
            />
            <Container>
              <AllEventsView
                loading={allEventsLoading}
                activeEvents={activeEvents}
                sponsoredEvents={sponsoredEvents}
              />
            </Container>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

EventScreen.navigationOptions = {
  header: null,
}

export default EventScreen
