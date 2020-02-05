import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import styled from 'styled-components/native'
import headerBack from '../../theme/header'
import { color } from '../../theme'
import Block from '../../components/Block'
import Input from '../../components/Input'
import { useQuery } from '@apollo/react-hooks'
import GET_LOCATIONS from '../../graphql-queries/getLocations'
import InputGroupHeader from '../../components/InputGroupHeader'
import { debounce } from '../../utils'

const DropdownWrapper = styled(View)`
  position: relative;
  width: 100%;
`

const Dropdown = styled(View)`
  width: 100%;
  border-top-width: 1px;
  border-left-width: 1px;
  border-right-width: 1px;
  border-color: ${color.grey};
  border-radius: 4px;
`

const DropdownItem = styled(TouchableOpacity)`
  padding: 16px;
  border-bottom-width: 1px;
  border-color: ${(props) => (props.active ? color.primary : color.grey)};
  background-color: ${(props) => (props.active ? color.primary : color.white)};
`

const DropdownLabel = styled(Text)`
  font-size: 17px;
  font-weight: ${(props) => (props.active ? 600 : 400)};
  color: ${(props) => (props.active ? color.white : color.grey)};
`

const DropdownLoadMore = styled(Text)`
  color: ${color.primary};
  font-size: 15px;
  font-weight: 500;
  text-align: center;
  margin: 0 auto;
`

const AddEventScreen = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const [locationName, setLocationName] = useState('')
  const [fetchingMore, setFetchingMore] = useState(false)

  const { data = {}, fetchMore, loading } = useQuery(GET_LOCATIONS, {
    variables: {
      first: 5,
      name: locationName,
    },
  })
  const { locations: locationsConnection = {} } = data
  const { locations = [], pageInfo = {} } = locationsConnection
  const { hasNextPage, endCursor } = pageInfo

  const loadMoreLocations = async () => {
    setFetchingMore(true)

    await fetchMore({
      query: GET_LOCATIONS,
      variables: {
        first: 5,
        name: locationName,
        after: endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        fetchMoreResult.locations.locations = [
          ...prev.locations.locations,
          ...fetchMoreResult.locations.locations,
        ]
        return fetchMoreResult
      },
    })

    setFetchingMore(false)
  }

  const handleLocationName = debounce((name) => {
    setLocationName(name)
  }, 300)

  return (
    <ScrollView>
      <InputGroupHeader
        label="Algemene informatie"
        onClear={() => {
          setTitle('')
          setDescription('')
        }}
      />

      <Block
        style={{
          paddingLeft: 16,
          paddingRight: 16,
          marginBottom: 16,
        }}
      >
        <Input
          placeholder="Naam van evenement"
          value={title}
          onChangeText={(value) => setTitle(value)}
          required
        />
      </Block>

      <Block
        style={{
          paddingLeft: 16,
          paddingRight: 16,
          marginBottom: 16,
        }}
      >
        <Input
          placeholder="Beschrijving"
          value={description}
          onChangeText={(value) => setDescription(value)}
          required
        />
      </Block>

      <InputGroupHeader label="Locatie" onClear={() => setLocation(null)} />

      <Block
        style={{
          paddingLeft: 16,
          paddingRight: 16,
          marginBottom: 16,
        }}
      >
        <Block style={{ marginBottom: 16 }}>
          <Input
            placeholder="Zoeken naar locaties.."
            onChangeText={(value) => handleLocationName(value)}
            loading={loading}
          />
        </Block>

        <DropdownWrapper>
          {Boolean(locations.length) && (
            <Dropdown>
              {locations.map((l) => (
                <DropdownItem
                  active={l.id === location}
                  key={l.id}
                  onPress={() => setLocation(l.id)}
                >
                  <DropdownLabel active={l.id === location}>
                    {l.name}
                  </DropdownLabel>
                </DropdownItem>
              ))}

              {hasNextPage && (
                <DropdownItem onPress={loadMoreLocations}>
                  <DropdownLoadMore>
                    {fetchingMore ? (
                      <ActivityIndicator color={color.primary} />
                    ) : (
                      'Meer laden'
                    )}
                  </DropdownLoadMore>
                </DropdownItem>
              )}
            </Dropdown>
          )}
        </DropdownWrapper>
      </Block>

      <InputGroupHeader
        label="Datum"
        onClear={() => {
          setStartDate(null)
          setEndDate(null)
        }}
      />
    </ScrollView>
  )
}

AddEventScreen.navigationOptions = {
  title: 'Evenement toevoegen',
  ...headerBack,
}

export default AddEventScreen
