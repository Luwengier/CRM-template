import { ReactNode } from 'react'
import { SnackbarProvider } from 'notistack'
import { NotifyAlert } from 'features/notification/components/Alert'

// Type
interface Props {
  children: ReactNode
}

type ExtraProps = {
  actions?: {
    label: string
    action: () => void
  }[]
}

declare module 'notistack' {
  interface VariantOverrides {
    error: ExtraProps
    warning: ExtraProps
    default: ExtraProps
    success: ExtraProps
    info: ExtraProps
  }
}

// Provider
const NotistackProvider = ({ children }: Props) => {
  return (
    <SnackbarProvider
      maxSnack={5}
      preventDuplicate
      autoHideDuration={4000}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      Components={{
        error: NotifyAlert,
        warning: NotifyAlert,
        default: NotifyAlert,
        success: NotifyAlert,
        info: NotifyAlert,
      }}
    >
      {children}
    </SnackbarProvider>
  )
}

export default NotistackProvider
