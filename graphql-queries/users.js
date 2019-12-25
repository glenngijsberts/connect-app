import { gql } from 'apollo-boost'

const GET_USERS = gql`
  query users {
    users {
      id
      name
    }
  }
`

export default GET_USERS
