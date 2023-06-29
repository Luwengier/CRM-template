export interface PaletteOptionType {
  light1?: string
  light2?: string
  light3?: string
  light4?: string
  dark1?: string
  dark2?: string
  dark3?: string
  dark4?: string
}

export interface GrayLayer {
  '00': string
  '21': string
  '42': string
  '61': string
  '75': string
  '9e': string
  bd: string
  e0: string
  ee: string
  f5: string
  fa: string
  ff: string
}

// 可參考 https://mui.com/material-ui/customization/palette/#palette-colors
declare module '@mui/material/styles' {
  // Palette
  interface Palette {
    gray: GrayLayer
  }
  interface PaletteOptions {
    gray: GrayLayer
  }
  interface Theme {
    fadeShadows: ['none', string, string, string, string]
  }
  interface ThemeOptions {
    fadeShadows?: ['none', string, string, string, string]
  }

  interface PaletteColor extends PaletteOptionType {}
  interface SimplePaletteColorOptions extends PaletteOptionType {}
}
