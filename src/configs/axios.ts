import axios from 'axios'
import { router } from 'App'

export const SERVER_URL = process.env.REACT_APP_BASE_URL

axios.defaults.baseURL = SERVER_URL
axios.defaults.paramsSerializer = {
  indexes: null, // array indexes format (null - no brackets, false (default) - empty brackets, true - brackets with indexes)
}

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      router.navigate('/sign-out')
    }
    return Promise.reject(error)
  }
)
