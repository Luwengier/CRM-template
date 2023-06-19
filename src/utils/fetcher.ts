import axios from 'axios'
import { enqueueError } from './notify'

export const swrFetcher = async (
  ...args: [string | [string, Record<string, string> | undefined]]
) => {
  const [arg1] = args
  let url
  let params
  if (Array.isArray(arg1)) {
    url = arg1[0]
    params = arg1[1]
  } else {
    url = arg1
  }

  try {
    const response = await axios.get(url, {
      params,
    })

    return response
  } catch (error) {
    enqueueError(error)
  }
}
