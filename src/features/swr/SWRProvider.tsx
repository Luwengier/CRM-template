import { ReactNode } from 'react'
import { SWRConfig } from 'swr'
import { swrFetcher } from './utils'

// Type
interface Props {
  children: ReactNode
}

// Provider
export const SWRProvider = ({ children }: Props) => {
  return (
    <SWRConfig
      value={{
        fetcher: swrFetcher,
        dedupingInterval: 3600,
      }}
    >
      {children}
    </SWRConfig>
  )
}

export default SWRProvider
