import React, { useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import styled from 'styled-components/native'
import Layout from '../../theme/Layout'
import SegmentController from '../../components/SegmentController'
import LargeHeader from '../../components/LargeHeader'
import SmallHeader from '../../components/SmallHeader'
import EventEmptyView from '../../components/EventEmptyView'
import { useQuery } from '@apollo/react-hooks'
import GET_VIEWER_EVENTS from '../../graphql-queries/getViewerEvents'

const EventScreen = () => {
  const [active, setActive] = useState(0)
  const [largeHeaderInView, setLargeHeaderInView] = useState(true)

  const checkPosition = (event) => {
    if (event.nativeEvent.contentOffset.y > 35) {
      return setLargeHeaderInView(false)
    }

    setLargeHeaderInView(true)
  }

  const { data, loading } = useQuery(GET_VIEWER_EVENTS)

  console.log(data)

  return (
    <SafeAreaView>
      <SmallHeader title="Evenementen" largeHeaderInView={largeHeaderInView} />

      <ScrollView
        onScroll={(event) => checkPosition(event)}
        scrollEventThrottle={16}
        style={{
          minHeight: Layout.window.height,
        }}
      >
        <LargeHeader title="Evenementen" withSmallHeader={true} />

        <SegmentController
          active={active}
          setActive={setActive}
          controls={['Mijn evenementen', 'Evenementen']}
        />

        {active === 0 && <EventEmptyView />}

        {active === 1 && <Text>Evenementen</Text>}
      </ScrollView>
    </SafeAreaView>
  )
}

EventScreen.navigationOptions = {
  header: null,
}

export default EventScreen
