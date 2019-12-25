import { gql } from 'apollo-boost'

const LOGIN_WITH_EMAIL = gql`
  mutation loginWithEmail($email: String!, $password: String!) {
    loginWithEmail(email: $email, password: $password) {
      token
      user {
        id
        name
      }
      errors {
        code
        message
      }
    }
  }
`

export default LOGIN_WITH_EMAIL
