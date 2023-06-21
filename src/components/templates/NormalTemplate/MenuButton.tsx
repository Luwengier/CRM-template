import {
  useState,
  MouseEvent,
  ReactNode,
  // useRef,
  forwardRef,
  // ForwardedRef,
} from 'react'
import { alpha, styled, SxProps, Theme } from '@mui/material/styles'
import Menu, { MenuProps } from '@mui/material/Menu'
import Button, { ButtonProps } from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ListItemIcon from '@mui/material/ListItemIcon'

interface MenuButtonProps extends ButtonProps {
  children: ReactNode
  options: {
    label: string
    icon?: ReactNode
    action: () => void
  }[]
  menuProps?: Omit<MenuProps, 'open'>
  itemSlot?: ReactNode
  sx?: SxProps<Theme>
}

const StyledButton = styled(Button)(({ theme }) => ({
  paddingLeft: theme.spacing(0.25),
  paddingRight: theme.spacing(0.25),
}))

export const StyledMenu = styled((props: MenuProps) => (
  <Menu
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiMenu-paper': {
    '& .MuiMenu-list': {
      padding: theme.spacing(0.25, 0),
      minWidth: '7.75rem',
    },
    '& .MuiMenuItem-root': {
      padding: theme.spacing(1, 1.5),
      '&:not(:last-of-type)': {
        borderBottom: `1px solid ${theme.palette.gray.f5}`,
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}))

const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  (
    { children, options, className, variant, color, menuProps, itemSlot, sx },
    ref
  ) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
      setAnchorEl(null)
    }

    const handleMenuItemClick = (action: () => void) => {
      action()
      handleClose()
    }

    const renderMenuItems = (
      options: {
        label: string
        icon?: ReactNode
        action: () => void
      }[]
    ) => {
      return options.map((option) => (
        <MenuItem
          key={option.label}
          disableRipple
          onClick={() => handleMenuItemClick(option.action)}
        >
          {option.icon && <ListItemIcon>{option.icon}</ListItemIcon>}
          <Typography variant="body2">{option.label}</Typography>
        </MenuItem>
      ))
    }

    return (
      <>
        <StyledButton
          sx={sx}
          ref={ref}
          aria-haspopup="true"
          aria-controls={open ? 'customized-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          endIcon={<ArrowDropDownIcon />}
          color={color}
          variant={variant}
          className={className}
        >
          {children}
        </StyledButton>
        <StyledMenu
          id="customized-menu"
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          {...menuProps}
        >
          {itemSlot}
          {renderMenuItems(options)}
        </StyledMenu>
      </>
    )
  }
)

export default MenuButton
