import React from 'react'
import Button from '../Button'
import { View, Image } from 'react-native'
import Layout from '../../theme/Layout'
import styled from 'styled-components/native'
import { SmallTitle, Footnote } from '../Text'

const EventsView = styled(View)`
  display: flex;
  width: ${Layout.gridWidth};
  margin: 0 auto;
  padding-top: 32px;
  justify-content: center;
  align-items: center;
`

const StyledImage = styled(Image)`
  width: 300px;
  height: 250px;
  margin-bottom: 32px;
`

const StyledButton = styled(Button)`
  width: 100%;
`

const EventEmptyView = () => (
  <EventsView>
    <StyledImage source={require('../../assets/images/undraw_events.png')} />

    <SmallTitle style={{ marginBottom: 8 }}>
      Je evenementenlijst is nog leeg
    </SmallTitle>
    <Footnote style={{ marginBottom: 24 }} center>
      Voeg evenementen toe aan je lijst om de kans op nieuwe connecties te
      vergroten!
    </Footnote>

    <StyledButton>Zoeken naar evenementen</StyledButton>
  </EventsView>
)

export default EventEmptyView
