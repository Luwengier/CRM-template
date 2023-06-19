/// <reference path="index.d.ts"/>
import { useState, useMemo, ReactNode } from 'react'
import { CssBaseline } from '@mui/material'
import { grey, amber, teal } from '@mui/material/colors'
import useMediaQuery from '@mui/material/useMediaQuery'
import ColorModeContext from 'contexts/ColorModeContext'
import buttonMixin from './button-mixin'

import {
  Theme,
  Palette,
  Components,
  createTheme,
  TypographyVariantsOptions,
  ThemeOptions,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles'

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>(
    useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light'
  )

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    []
  )

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  )
}

const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    primary:
      mode === 'light'
        ? {
            dark2: teal[800],
            dark1: teal[700],
            main: teal[500],
            light1: teal[300],
            light2: teal[200],
            light3: teal[100],
            light4: teal[50],
          }
        : {
            dark2: teal[50],
            dark1: teal[50],
            dark: teal[100],
            main: teal[200],
            light: teal[300],
            light1: teal[400],
            light2: teal[500],
            light3: teal[600],
            light4: teal[800],
          },
    secondary:
      mode === 'light'
        ? {
            dark2: amber[800],
            dark1: amber[700],
            main: amber[500],
            light1: amber[300],
            light2: amber[200],
            light3: amber[100],
          }
        : {
            dark2: amber[100],
            dark1: amber[200],
            dark: amber[300],
            main: amber[400],
            light: amber[500],
            light1: amber[600],
            light2: amber[700],
            light3: amber[800],
          },
    success:
      mode === 'light'
        ? {
            dark: '#60a405',
            main: '#68b500',
            light: '#def4dc',
          }
        : {
            dark: '#def4dc',
            main: '#68b500',
            light: '#60a405',
          },
    info:
      mode === 'light'
        ? {
            dark: '#01579b',
            main: '#0288d1',
            light: '#71d3fe',
          }
        : {
            dark: '#71d3fe',
            main: '#0288d1',
            light: '#01579b',
          },
    warning:
      mode === 'light'
        ? {
            dark: '#e0910f',
            main: '#f2a019',
            light: '#fcf0d1',
          }
        : {
            dark: '#fcf0d1',
            main: '#f2a019',
            light: '#e0910f',
          },
    error:
      mode === 'light'
        ? {
            dark: '#be2b28',
            main: '#c30f1c',
            light: '#ffebeb',
          }
        : {
            dark: '#ffebeb',
            main: '#fa9aa0',
            light: '#be2b28',
          },
    gray:
      mode === 'light'
        ? {
            '00': '#000000',
            '21': grey[900],
            '42': grey[800],
            '61': grey[700],
            '75': grey[600],
            '9e': grey[500],
            bd: grey[400],
            e0: grey[300],
            ee: grey[200],
            f5: grey[100],
            fa: grey[50],
            ff: '#ffffff',
          }
        : {
            '00': '#f5f5f5',
            '21': grey[50],
            '42': grey[100],
            '61': grey[200],
            '75': grey[300],
            '9e': grey[400],
            bd: grey[500],
            e0: grey[600],
            ee: grey[700],
            f5: '#464848',
            fa: '#2b2c2c',
            ff: '#121212',
          },
    ...(mode === 'dark' && {
      background: {
        default: grey[900],
        paper: grey[800],
      },
    }),
    text: {
      ...(mode === 'light'
        ? {
            primary: grey[900],
            secondary: grey[800],
          }
        : {
            primary: '#ffffff',
            secondary: grey[50],
          }),
    },
  },
  fadeShadows:
    mode === 'light'
      ? [
          'none',
          '0px 0.3px 1px rgba(0, 150, 136, 0.1), 0px 1.5px 3.5px rgba(0, 150, 136, 0.13)',
          '0px 0.5px 2px rgba(0, 150, 136, 0.1), 0px 3px 7px rgba(0, 150, 136, 0.13)',
          '0px 1px 3px rgba(0, 150, 136, 0.1), 0px 6px 14px rgba(0, 150, 136, 0.13)',
          '0px 4px 14px rgba(0, 150, 136, 0.18), 0px 25px 60px rgba(0, 150, 136, 0.2)',
        ]
      : [
          'none',
          '0px 0.3px 1px rgba(128, 203, 196, 0.1), 0px 1.5px 3.5px rgba(128, 203, 196, 0.13)',
          '0px 0.5px 2px rgba(128, 203, 196, 0.1), 0px 3px 7px rgba(128, 203, 196, 0.13)',
          '0px 1px 3px rgba(128, 203, 196, 0.1), 0px 6px 14px rgba(128, 203, 196, 0.13)',
          '0px 4px 14px rgba(128, 203, 196, 0.18), 0px 25px 60px rgba(128, 203, 196, 0.2)',
        ],
  shape: {
    borderRadius: 4,
  },
  components: componentOptionsMixin,
  typography: getTypographyOptions,
})

const componentOptionsMixin: Components<Omit<Theme, 'components'>> = {
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

const getTypographyOptions = (palette: Palette): TypographyVariantsOptions => ({
  fontFamily: [
    'Roboto',
    '"Noto Sans TC"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),

  // In Chinese and Japanese the characters are usually larger,
  // so a smaller fontsize may be appropriate.
  // fontSize: 12,

  h1: {
    fontSize: '4.25rem',
    fontWeight: 300,
    lineHeight: 1.5,
    color: palette.primary.main,
  },
  h2: {
    fontWeight: 300,
    lineHeight: 1.5,
    color: palette.gray[42],
  },
  h4: {
    fontSize: '2rem',
    fontWeight: 500,
    lineHeight: 1.5,
    color: palette.gray[42],
  },
  h5: {
    fontWeight: 500,
    lineHeight: 1.5,
    color: palette.gray[42],
  },
  h6: {
    fontWeight: 500,
    lineHeight: 1.5,
    color: palette.gray[42],
  },
  subtitle1: {
    fontWeight: 700,
    lineHeight: 1.5,
    color: palette.gray[42],
  },
  subtitle2: {
    fontWeight: 700,
    lineHeight: 1.5,
    color: palette.gray[42],
  },
  body2: {
    lineHeight: 1.5,
    color: palette.gray[42],
  },
  button: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1,
    textTransform: 'none',
  },
  // Custom variant
  chip: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1,
    color: palette.gray[42],
  },
})
