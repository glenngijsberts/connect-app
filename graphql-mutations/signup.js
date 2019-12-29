import { gql } from 'apollo-boost'

const SIGNUP = gql`
  mutation signup(
    $name: String!
    $email: String!
    $displayTitle: String
    $website: String
    $phone: String
    $photo: String
    $password: String!
    $isLinkedInUser: Boolean
  ) {
    signup(
      name: $name
      email: $email
      displayTitle: $displayTitle
      website: $website
      phone: $phone
      photo: $photo
      password: $password
      isLinkedInUser: $isLinkedInUser
    ) {
      token
      user {
        id
        name
        email
      }
      errors {
        code
        message
      }
    }
  }
`

export default SIGNUP
