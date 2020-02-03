import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { ScrollView } from 'react-native'
import { color } from '../../theme'
import { SmallButton } from '../Button'

const ButtonsGroup = styled(ScrollView)`
  border-bottom-width: 1px;
  border-color: ${color.greyLight};
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 16px;
`

const filters = [
  {
    label: 'Alle evenementen',
    value: undefined,
  },
  {
    label: 'Tech',
    value: 'TECH',
  },
  {
    label: 'Design',
    value: 'DESIGN',
  },
  {
    label: 'HR',
    value: 'HR',
  },
  {
    label: 'Finance',
    value: 'FINANCE',
  },
  {
    label: 'Business',
    value: 'BUSINESS',
  },
]

const EventCategoryCarousel = ({ eventCategory, setEventCategory }) => {
  return (
    <ButtonsGroup horizontal={true} showsHorizontalScrollIndicator={false}>
      {filters.map((filter, index) => (
        <SmallButton
          active={filter.value === eventCategory}
          onPress={() => setEventCategory(filter.value)}
          key={index}
          style={{
            // Give the last filter extra margin
            marginRight: index === filters.length - 1 ? 32 : 8,
          }}
        >
          {filter.label}
        </SmallButton>
      ))}
    </ButtonsGroup>
  )
}

EventCategoryCarousel.propTypes = {
  eventCategory: PropTypes.string,
  setEventCategory: PropTypes.func,
}

export default EventCategoryCarousel
