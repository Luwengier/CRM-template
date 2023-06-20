import {
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  KeyboardEvent,
} from 'react'
import Popover, { PopoverProps } from '@mui/material/Popover'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { FullColDef, ParamsObj } from 'types/gridCol'
import { styled } from '@mui/material'
import { omit } from 'lodash-es'
// import { omit } from 'lodash-es'

interface SearchProps extends Omit<PopoverProps, 'open'> {
  col: FullColDef | null
  handleClose: () => void
  searchParams: ParamsObj
  setPage?: Dispatch<SetStateAction<number>>
  setSearchParams: Dispatch<SetStateAction<ParamsObj>>
}

const SearchPopover = ({
  anchorEl,
  col,
  setPage,
  handleClose,
  searchParams,
  setSearchParams,
  ...rest
}: SearchProps) => {
  return (
    <Popover
      // id={id}
      open={Boolean(anchorEl && col && col.colType === 'search')}
      onClose={handleClose}
      anchorEl={anchorEl}
      elevation={2}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...rest}
    >
      <SearchPopoverContent
        col={col}
        handleClose={handleClose}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        setPage={setPage}
      />
    </Popover>
  )
}

const SearchPopoverContent = ({
  col,
  setPage,
  handleClose,
  searchParams,
  setSearchParams,
}: SearchProps) => {
  const [value, setValue] = useState<string>(
    ((col && searchParams[col?.field]) as string) || ''
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleSubmit = (e: KeyboardEvent<HTMLElement>) => {
    e.preventDefault()
    if (!col?.field) return
    if (e.key !== 'Enter') return
    const omitParams = omit(searchParams, [col.field])
    value === ''
      ? setSearchParams(omitParams)
      : setSearchParams((prev) => ({
          ...prev,
          [col.field]: value,
        }))

    setPage && setPage(0)
    handleClose()
  }

  return (
    <StyledWrapper>
      <Box>
        <TextField
          size="small"
          value={value}
          onChange={handleChange}
          onKeyUp={handleSubmit}
          {...(col && { label: col.headerName })}
        />
      </Box>
    </StyledWrapper>
  )
}

const StyledWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(1.5),
  div: {
    display: 'flex',
    alignItems: 'stretch',
    columnGap: theme.spacing(0.5),
    button: {
      textTransform: 'none',
      fontSize: '1rem',
    },
    '.reset-btn': {
      color: theme.palette.gray[61],
      backgroundColor: theme.palette.gray.ff,
      border: `1px solid ${theme.palette.gray['9e']}`,
    },
  },
}))

export default SearchPopover
