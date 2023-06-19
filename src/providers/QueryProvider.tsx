import { ReactNode } from 'react'
import { SWRConfig } from 'swr'
import { swrFetcher } from 'utils/fetcher'

// Type
interface Props {
  children: ReactNode
}

// Provider
export const QueryProvider = ({ children }: Props) => {
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
