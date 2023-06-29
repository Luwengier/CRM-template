import { useState, useMemo, ReactNode } from 'react'
import { CssBaseline } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import ColorModeContext from './ColorModeContext'

import getTypographyMixin from './mixins/typography-mixin'
import getPaletteMixin from './mixins/palette-mixin'
import componentsMixin from './mixins/component-mixin'

import {
  createTheme,
  ThemeOptions,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles'

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>(
    useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light'
  )

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    []
  )

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
  typography: getTypographyMixin,
  palette: getPaletteMixin(mode),
  components: componentsMixin,
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
})

declare module '@mui/material/styles' {
  interface Theme {
    fadeShadows: ['none', string, string, string, string]
  }
  interface ThemeOptions {
    fadeShadows?: ['none', string, string, string, string]
  }
}

export default ThemeProvider
