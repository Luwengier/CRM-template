import { useContext, useEffect } from 'react'
import { AuthContext } from 'contexts/AuthContext'

import axios from 'axios'
import { Navigate } from 'react-router-dom'

const SignOut = () => {
  const { reset: resetAuth } = useContext(AuthContext)

  useEffect(() => {
    localStorage.removeItem('token')
    axios.defaults.headers.common['Authorization'] = undefined

    resetAuth()
  })

  return <Navigate to="/login" replace />
}

export default SignOut
