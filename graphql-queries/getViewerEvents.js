import { gql } from 'apollo-boost'
import eventFragment from '../graphql-fragments/eventFragment'

const GET_VIEWER_EVENTS = gql`
  query viewer {
    viewer {
      id
      events {
        ...event
      }
    }
  }

  ${eventFragment}
`

export default GET_VIEWER_EVENTS
