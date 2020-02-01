import React, { useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import styled from 'styled-components/native'
import { color } from '../../theme'

const Header = styled(View)`
  height: 96px;
  padding-left: 16px;
  padding-right: 16px;
  border-bottom-color: ${color.greyLight};
  border-bottom-width: 1px;
  padding-bottom: 8px;
  display: flex;
  justify-content: flex-end;
`

const Title = styled(Text)`
  font-size: 34px;
  color: ${color.black};
  font-weight: bold;
`

const SegmentLeft = styled(TouchableOpacity)`
  background-color: ${(props) => (props.active ? color.primary : color.white)};
  padding: 8px;
  flex: 1;
  border-width: 1px;
  border-color: ${color.primary};
  border-top-left-radius: 8px;
  border-top-right-radius: 0px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 0px;
`
const SegmentRight = styled(TouchableOpacity)`
  background-color: ${(props) => (props.active ? color.primary : color.white)};
  padding: 8px;
  flex: 1;
  border-width: 1px;
  border-color: ${color.primary};
  border-top-left-radius: 0px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 8px;
`

const SegmentController = styled(View)`
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

const EventsView = styled(View)`
  display: flex;
  height: 400px;
`

const EventScreen = () => {
  const [index, setIndex] = useState(0)
  return (
    <SafeAreaView>
      <ScrollView>
        <Header>
          <Title>Evenementen</Title>
        </Header>

        <SegmentController>
          <SegmentLeft active={index === 0} onPress={() => setIndex(0)}>
            <SegmentLabel active={index === 0}>Mijn evenementen</SegmentLabel>
          </SegmentLeft>
          <SegmentRight active={index === 1} onPress={() => setIndex(1)}>
            <SegmentLabel active={index === 1}>Evenementen</SegmentLabel>
          </SegmentRight>
        </SegmentController>

        {index === 0 && (
          <EventsView>
            <Text>Mijn evenementen</Text>
          </EventsView>
        )}

        {index === 1 && (
          <EventsView>
            <Text>Evenementen</Text>
          </EventsView>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

EventScreen.navigationOptions = {
  header: null,
}

export default EventScreen
