import React, { useState, createContext } from 'react'

/*
  Global state management with the Context API. We
  use this to handle the data in the register flow because
  we're using data from view 1 and view 2 inside view 3 to
  do the request to the server.
*/
const RegisterContext = createContext()

function RegisterProvider(props) {
  const [user, setUser] = useState({
    name: '',
    email: '',
    tagline: '',
    website: '',
    phone: '',
  })
  const [isLinkedInUser, setIsLinkedInUser] = useState(true)
  const [userPhoto, setUserPhoto] = useState(null)
  const [userPassword, setUserPassword] = useState('')

  return (
    <RegisterContext.Provider
      value={{
        user: {
          ...user,
          userPhoto,
          userPassword,
          isLinkedInUser,
        },
        setUser: (state) => setUser(state),
        setIsLinkedInUser: (bool) => setIsLinkedInUser(bool),
        setUserPhoto: (state) => setUserPhoto(state),
        setUserPassword: (state) => setUserPassword(state),
        clear: () => {
          setUser({
            name: '',
            email: '',
            tagline: '',
            website: '',
            phone: '',
            isLinkedInUser: false,
          })
          setUserPhoto(null)
          setUserPassword('')
        },
      }}
    >
      {props.children}
    </RegisterContext.Provider>
  )
}

export default RegisterContext
export { RegisterProvider }
