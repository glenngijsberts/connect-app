import { gql } from 'apollo-boost'
import eventFragment from '../graphql-fragments/eventFragment'

const GET_ACTIVE_EVENTS = gql`
  query activeEvents($isSponsored: Boolean, $category: EventCategory) {
    activeEvents(isSponsored: $isSponsored, category: $category) {
      events {
        ...event
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }

  ${eventFragment}
`

export default GET_ACTIVE_EVENTS
