import { Theme, Components } from '@mui/material/styles'

const buttonMixin: Components<Omit<Theme, 'components'>>['MuiButton'] = {
  defaultProps: {
    disableElevation: true,
  },
  styleOverrides: {
    root: ({ theme, ownerState }) => ({
      '&.Mui-disabled': {
        color: theme.palette.gray.bd,
        borderColor: theme.palette.gray.bd,
        backgroundColor: theme.palette.gray.f5,
      },
      '.MuiButton-startIcon, .MuiButton-endIcon': {
        // 設計稿中的 icon按鈕 都沒算到icon預設周圍還留有空間，只能用負的margin去處理掉
        marginTop: theme.spacing(-0.25),
        marginBottom: theme.spacing(-0.25),
        '.MuiSvgIcon-fontSizeMedium': {
          fontSize: '1.25rem',
        },
      },
      '.MuiButton-startIcon': {
        marginRight: theme.spacing(0.5),
      },
      '.MuiButton-endIcon': {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(-0.5),
      },
    }),
  },
}

export default buttonMixin
