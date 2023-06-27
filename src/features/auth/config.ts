import axios from 'axios'
import { router } from 'App'

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      router.navigate('/sign-out')
    }
    return Promise.reject(error)
  }
)
