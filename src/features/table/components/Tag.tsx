import Chip from '@mui/material/Chip'
import { styled } from '@mui/material/styles'

const Tag = styled(Chip)(({ theme, variant }) => ({
  borderRadius: Number(theme.shape.borderRadius) / 2,
  color: theme.palette.background.default,
  fontSize: '0.75rem',
  padding:
    variant === 'outlined' ? 'calc(0.25rem - 1px) 0.5rem' : '0.25rem 0.5rem',
  fontWeight: 500,
  lineHeight: 1,
  letterSpacing: 0.16,
  height: 'unset',
  '.MuiChip-label': {
    padding: 0,
  },
  '&.MuiChip-colorDefault': {
    backgroundColor: theme.palette.gray['9e'],
  },
  '&.MuiChip-outlinedSecondary': {
    color: theme.palette.secondary.dark,
    backgroundColor: theme.palette.secondary.light4,
    border: `1px solid ${theme.palette.secondary.dark}`,
  },
  '&.MuiChip-filled.alert': {
    color: theme.palette.secondary.dark,
    backgroundColor: 'transparent',
    border: 'none',
    padding: 0,
    fontWeight: 400,
    fontSize: '0.875rem',
  },
  '&.MuiChip-filled.abnormal': {
    color: theme.palette.error.main,
    backgroundColor: 'transparent',
    border: 'none',
    padding: 0,
    fontWeight: 400,
    fontSize: '0.875rem',
  },
  '&.MuiChip-filled.none': {
    backgroundColor: 'transparent',
    border: 'none',
    padding: 0,
  },
  '&.MuiChip-filled.active': {
    color: theme.palette.success.main,
    backgroundColor: 'transparent',
    border: 'none',
    padding: 0,
    fontWeight: 400,
    fontSize: '0.875rem',
  },
  '&.MuiChip-filled.inactive': {
    color: theme.palette.error.main,
    backgroundColor: 'transparent',
    border: 'none',
    padding: 0,
    fontWeight: 400,
    fontSize: '0.875rem',
  },
}))

export default Tag
