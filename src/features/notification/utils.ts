import { enqueueSnackbar } from 'notistack'

export const enqueueSuccess = (msg: string) => {
  enqueueSnackbar(msg, {
    variant: 'success',
  })
}

export const enqueueError = (error: any) => {
  const errorMsg: string | string[] | undefined = error?.response?.data?.message

  enqueueSnackbar(
    Array.isArray(errorMsg)
      ? errorMsg.join(', ')
      : errorMsg || error?.message || 'Something error!',
    {
      variant: 'error',
    }
  )
}
