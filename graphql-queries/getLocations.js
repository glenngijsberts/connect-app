import { gql } from 'apollo-boost'

const GET_LOCATIONS = gql`
  query locations($name: String, $first: Int, $after: ID) {
    locations(name: $name, first: $first, after: $after) {
      locations {
        id
        name
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

export default GET_LOCATIONS
