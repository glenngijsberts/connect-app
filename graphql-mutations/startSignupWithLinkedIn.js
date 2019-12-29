import { gql } from 'apollo-boost'

const START_SIGNUP_WITH_LINKEDIN = gql`
  mutation startSignupWithLinkedIn($access_token: String!) {
    startSignupWithLinkedIn(access_token: $access_token) {
      token
      user {
        id
        name
      }
      firstName
      lastName
      email
      photo
      errors {
        code
        message
      }
    }
  }
`

export default START_SIGNUP_WITH_LINKEDIN
