import { gql } from 'apollo-boost'

const SIGNUP_WITH_EMAIL = gql`
  mutation signupWithEmail(
    $name: String!
    $email: String!
    $displayTitle: String
    $website: String
    $phone: String
    $password: String!
  ) {
    signupWithEmail(
      name: $name
      email: $email
      displayTitle: $displayTitle
      website: $website
      phone: $phone
      password: $password
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

export default SIGNUP_WITH_EMAIL
