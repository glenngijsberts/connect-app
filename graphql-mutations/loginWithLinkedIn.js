import { gql } from 'apollo-boost'

const LOGIN_WITH_LINKEDIN = gql`
  mutation loginWithLinkedIn($access_token: String!) {
    loginWithLinkedIn(access_token: $access_token) {
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

export default LOGIN_WITH_LINKEDIN
