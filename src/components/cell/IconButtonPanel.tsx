import { FC, MouseEvent, useEffect, useState } from 'react'
import { FullColDef } from 'types/gridCol'
import SouthIcon from '@mui/icons-material/South'
import NorthIcon from '@mui/icons-material/North'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import { SvgIconProps } from '@mui/material'

const IconButtonPanel = ({
  col,
  sortPairs,
  handleIconClick,
}: {
  col: FullColDef
  sortPairs?: [string | undefined, string | undefined][]
  handleIconClick: (
    event: MouseEvent<HTMLButtonElement>,
    col: FullColDef
  ) => void
}) => {
  const [SortIcon, setSortIcon] = useState<FC<SvgIconProps>>()

  useEffect(() => {
    if (col.colType !== 'sort') return
    const currentIndex = sortPairs
      ? sortPairs.findIndex((item) => item[0] === col.field)
      : 0
    const currentOrder =
      sortPairs && sortPairs[currentIndex] ? sortPairs[currentIndex][1] : 'asc'
    setSortIcon(currentOrder === 'asc' ? NorthIcon : SouthIcon)
  }, [col, sortPairs])

  return (
    <>
      {col.colType === 'search' && (
        <IconButton
          size="small"
          aria-label="open-search-menu"
          onClick={(e) => handleIconClick(e, col)}
        >
          <SearchIcon className="action-icon" fontSize="inherit" />
        </IconButton>
      )}
      {col.colType === 'filter' && (
        <IconButton size="small" onClick={(e) => handleIconClick(e, col)}>
          <FilterAltIcon className="action-icon" fontSize="inherit" />
        </IconButton>
      )}
      {col.colType === 'sort' && (
        <IconButton size="small" onClick={(e) => handleIconClick(e, col)}>
          {SortIcon && <SortIcon className="action-icon" fontSize="inherit" />}
        </IconButton>
      )}
    </>
  )
}
export default IconButtonPanel
