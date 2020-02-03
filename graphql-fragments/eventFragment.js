import { gql } from 'apollo-boost'

const eventFragment = gql`
  fragment event on Event {
    id
    title
    category
    isSponsored
    description
    startDate
  }
`

export default eventFragment
