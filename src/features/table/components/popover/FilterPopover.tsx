import {
  useState,
  useEffect,
  useMemo,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from 'react'
import { omit } from 'lodash-es'
import { FullColDef, FilterOption, ParamsObj } from 'features/table/type'

import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Popover, { PopoverProps } from '@mui/material/Popover'

interface SearchProps extends Omit<PopoverProps, 'open'> {
  col: FullColDef
  searchParams: ParamsObj
  handleClose?: () => void
  setSearchParams: Dispatch<SetStateAction<ParamsObj>>
}

const FilterPopover = ({
  col,
  anchorEl,
  searchParams,
  handleClose,
  setSearchParams,
  ...rest
}: SearchProps) => {
  return (
    <Popover
      open={Boolean(anchorEl && col && col.colType === 'filter')}
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
      sx={{
        '.MuiFormControl-root': {
          m: 3,
        },
        '.MuiFormControlLabel-root': {
          userSelect: 'none',
        },
      }}
      {...rest}
    >
      <FilterCheckboxList
        col={col}
        searchParams={searchParams}
        handleClose={handleClose}
        setSearchParams={setSearchParams}
      />
    </Popover>
  )
}

// getInitialTable 之後依照 searchParam 的 field value 去修改, 目前假設為 string 或 string[]
// 如 searchParam = { filed1: 'aaa', field2: ['bbb', 'ccc'] }
const getInitialTable = (col: FullColDef, searchParams: ParamsObj) => {
  const paramValue = searchParams[col.field] as string | string[]

  const checkboxList: FilterOption[] = col.filterOptions || []
  const newChecked: Record<string, boolean> = {}
  checkboxList.forEach((item) => {
    if (
      (Array.isArray(paramValue) && paramValue.includes(item.value)) ||
      (typeof paramValue === 'string' && paramValue === item.value)
    ) {
      newChecked[item.value] = true
    } else {
      newChecked[item.value] = false
    }
  })

  return newChecked
}

const FilterCheckboxList = ({
  col,
  searchParams,
  setSearchParams,
}: SearchProps) => {
  const [checkedTable, setCheckedTable] = useState<Record<string, boolean>>(
    getInitialTable(col, searchParams)
  )

  const checkboxList = useMemo(() => col.filterOptions || [], [col])

  useEffect(() => {
    const checkedArr = Object.keys(checkedTable).filter((i) => checkedTable[i])
    // checkedArr.length === checkboxList.length ||
    checkedArr.length === 0
      ? setSearchParams((prev) => ({ ...omit(prev, col.field) }))
      : setSearchParams((prev) => ({
          ...prev,
          [col.field]: checkedArr.length === 1 ? checkedArr[0] : checkedArr,
        }))
  }, [checkboxList, checkedTable, col, setSearchParams])

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setCheckedTable((prev) => ({ ...prev, [event.target.name]: checked }))
  }

  const renderOptions = (list: FilterOption[]) => {
    return list.map((item) => {
      return (
        <FormControlLabel
          label={item.label}
          key={item.value}
          name={item.value}
          control={
            <Checkbox
              checked={checkedTable[item.value] || false}
              onChange={handleChange}
            />
          }
        />
      )
    })
  }

  return (
    <FormControl component="fieldset" variant="standard">
      <FormGroup>{renderOptions(checkboxList)}</FormGroup>
    </FormControl>
  )
}

export default FilterPopover
