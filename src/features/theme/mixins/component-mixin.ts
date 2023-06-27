import { Theme, Components } from '@mui/material/styles'
import buttonMixin from './button-mixin'

const componentsMixin: Components<Omit<Theme, 'components'>> = {
  MuiButton: buttonMixin,

  MuiDialog: {
    styleOverrides: {
      root: ({ theme }) => ({
        '.MuiBackdrop-root': {
          backgroundColor: theme.palette.action.disabled,
        },
      }),
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      input: ({ theme }) => ({
        '&.Mui-disabled': {
          backgroundColor: theme.palette.gray.ee,
        },
      }),
      notchedOutline: ({ theme }) => ({
        borderColor: theme.palette.gray['9e'],
      }),
    },
  },

  MuiInputLabel: {
    styleOverrides: {
      asterisk: ({ theme }) => ({
        color: theme.palette.error.main,
      }),
    },
  },

  MuiFormHelperText: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...theme.typography.caption,
        color: theme.palette.error.main,
      }),
    },
  },

  MuiAutocomplete: {
    styleOverrides: {
      tag: {
        '&.MuiChip-root': {
          marginTop: 0,
          marginBottom: 0,
        },
      },
    },
  },

  MuiCssBaseline: {
    styleOverrides: (theme) => ({
      '.MuiDataGrid-cell a': {
        color: theme.palette.primary.main,
      },
      '.MuiDataGrid-cell a:visited': {
        color: theme.palette.primary.light1,
      },
      'div.MuiTooltip-popper': {
        paddingBottom: theme.spacing(1),
        '.MuiTooltip-arrow': {
          color: theme.palette.gray[42],
        },
        '.MuiTooltip-tooltip': {
          backgroundColor: theme.palette.gray[42],
          color: theme.palette.gray.ff,
          padding: theme.spacing(1, 1.5),
          fontSize: '0.875rem',
          fontWeight: 400,
          maxWidth: '15rem',
        },
      },
      '.notistack-SnackbarContainer': {
        position: 'absolute',
        overflowX: 'hidden',
      },
    }),
  },
}

export default componentsMixin
