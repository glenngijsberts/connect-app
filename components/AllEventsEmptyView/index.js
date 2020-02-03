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
  width: 280px;
  height: 250px;
  margin-bottom: 32px;
`

const AllEventsEmptyView = () => (
  <EventsView>
    <StyledImage source={require('../../assets/images/undraw_add_event.png')} />

    <SmallTitle style={{ marginBottom: 8 }}>
      Geen evenementen gevonden
    </SmallTitle>

    <Footnote style={{ marginBottom: 24 }} center>
      Er zijn geen evenementen gevonden in deze categorie. Ga je zelf naar een
      evenement? Je kan deze rechtsboven zelf toevoegen!
    </Footnote>
  </EventsView>
)

export default AllEventsEmptyView
