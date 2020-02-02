import { gql } from 'apollo-boost'

const GET_VIEWER_EVENTS = gql`
  query viewer {
    viewer {
      id
      events {
        id
        title
        description
        startDate
      }
    }
  }
`

export default GET_VIEWER_EVENTS
