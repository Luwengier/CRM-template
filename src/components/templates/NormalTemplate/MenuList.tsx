import { FC, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import Collapse from '@mui/material/Collapse'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'

import { RouteItem } from 'configs/route'

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'

interface ListProps {
  routeConfig: RouteItem[]
  open: boolean
  layerCount?: number
  parentPath?: string
  handleClose?: () => void
}

const NavItem = ({
  open,
  item,
  layerCount,
  parentPath,
  isLink,
  handleClose,
}: {
  open: boolean
  item: RouteItem
  layerCount: number
  parentPath?: string
  isLink?: boolean
  handleClose?: () => void
}) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isExact = pathname === parentPath
  const isPartialActive =
    !item.index &&
    item.path !== '/' &&
    item.path !== '' &&
    pathname.includes(parentPath || '')

  const [extend, setExtend] = useState(
    true
    // isPartialActive
  )

  //   const flag = layerCount === 1 ? open && extend : handleClose ? false : extend
  const newLayerCount = ++layerCount

  const handleItemClick = () => {
    const path = parentPath
      ? parentPath.endsWith('/*')
        ? parentPath.slice(0, -2)
        : parentPath
      : ''

    if (isLink && !item.disabled) {
      navigate(path)
      handleClose && handleClose()
    }
  }

  const handleClick = () => {
    if (item.children) {
      open && setExtend(!extend)
      return
    }
    handleItemClick()
  }

  const ItemContent = (
    <ListItemButton onClick={handleClick} disabled={item.disabled}>
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText
        primary={item.name}
        primaryTypographyProps={{ noWrap: true }}
      />
      {item.children && open && (
        <ArrowDropUpIcon className={extend ? '' : 'verse'} />
      )}
    </ListItemButton>
  )

  return (
    <>
      <ListItem
        className={isExact ? 'exact' : isPartialActive ? 'partial' : ''}
        title={item.name}
        disablePadding
      >
        {ItemContent}
      </ListItem>

      {item.children && !item.disabled && (
        <Collapse in={extend} timeout={'auto'} component="li">
          <MenuList
            open={open}
            layerCount={newLayerCount}
            parentPath={parentPath}
            routeConfig={item.children}
            handleClose={handleClose}
          />
        </Collapse>
      )}
    </>
  )
}

const ListItems: FC<ListProps> = ({
  routeConfig,
  open,
  layerCount = 1,
  parentPath,
  handleClose,
}) => {
  const renderRouteItem = (routeConfig: RouteItem[]) =>
    routeConfig.map((item, index) => {
      if (item.hidden || item.path === '*') return null
      if (item.path === undefined)
        return (
          <Divider
            className="route-item-divider"
            key={index.toString()}
            component="li"
          />
        )

      const currentPath =
        (parentPath ? parentPath + '/' : '') + (item.index ? '' : item.path)

      const isLink = Boolean(!item.children && (item.path || item.index))

      return (
        <NavItem
          key={item.name + index.toString()}
          item={item}
          open={open}
          isLink={isLink}
          layerCount={layerCount}
          parentPath={currentPath}
          handleClose={handleClose}
        />
      )
    })

  return <>{renderRouteItem(routeConfig)}</>
}

const MenuList: FC<ListProps> = ({
  open,
  layerCount = 1,
  parentPath,
  routeConfig,
  handleClose,
}) => {
  return (
    <List disablePadding>
      <ListItems
        open={open}
        routeConfig={routeConfig}
        layerCount={layerCount}
        parentPath={parentPath}
        handleClose={handleClose}
      />
    </List>
  )
}

export default MenuList
