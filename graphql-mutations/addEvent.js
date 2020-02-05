import { gql } from 'apollo-boost'
import eventFragment from '../graphql-fragments/eventFragment'

const ADD_EVENT = gql`
  mutation addEvent(
    $title: String!
    $description: String!
    $startDate: DateTime!
    $endDate: DateTime!
    $category: EventCategory!
    $location: ID!
  ) {
    addEvent(
      title: $title
      description: $description
      startDate: $startDate
      endDate: $endDate
      category: $category
      location: $location
    ) {
      events {
        ...event
      }
      errors {
        code
        message
      }
    }
  }

  ${eventFragment}
`

export default ADD_EVENT
