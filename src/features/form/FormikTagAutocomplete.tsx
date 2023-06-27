import { memo, ReactNode } from 'react'
import { FormikProps } from 'formik'
import { styled } from '@mui/material/styles'

import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import InputLabel, { InputLabelProps } from '@mui/material/InputLabel'
import Autocomplete, {
  AutocompleteProps,
  AutocompleteRenderInputParams,
} from '@mui/material/Autocomplete'
import FormHelperText, {
  FormHelperTextProps,
} from '@mui/material/FormHelperText'

import InfoIcon from '@mui/icons-material/Info'
import CloseIcon from '@mui/icons-material/Close'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

// Type
interface Values {
  [x: string]: any
}

interface Option {
  id: string | number
  name: string
}

interface FormikTagAutocompleteProps<T extends Values>
  extends Omit<AutocompleteProps<Option, true, false, false>, 'renderInput'> {
  formik: FormikProps<T>
  name: string
  options: Option[]
  labelName?: string
  inputLabel?: string
  tooltip?: boolean
  tooltipTitle?: string | ReactNode
  required?: boolean
  LabelProps?: InputLabelProps
  placeholder?: string
  wrapperClassName?: string
  disableHelperText?: boolean
  FormHelperTextProps?: FormHelperTextProps
  optionMapping?: Record<number | string, number | string>
}

// Component
function UnstyledFormikTagAutocomplete<T extends Values = Values>({
  formik,
  name,
  options,
  tooltip,
  tooltipTitle,
  optionMapping,
  labelName,
  inputLabel,
  placeholder,
  required,
  disableHelperText,
  LabelProps,
  FormHelperTextProps,
  ...rest
}: FormikTagAutocompleteProps<T>) {
  return (
    <>
      {/* Label */}
      {inputLabel && (
        <Box display="flex" columnGap={0.5}>
          <InputLabel
            htmlFor={`${name}-tag-autocomplete`}
            required={required}
            {...LabelProps}
          >
            {inputLabel}
          </InputLabel>{' '}
          {tooltipTitle && (
            <Tooltip title={tooltipTitle || ''} placement="right">
              <InfoIcon
                sx={{
                  fontSize: '1rem',
                  color: (theme) => theme.palette.gray[61],
                  mt: (theme) => theme.spacing(0.25),
                }}
              />
            </Tooltip>
          )}
        </Box>
      )}

      {/* Autocomplete */}
      <Autocomplete
        multiple
        // freeSolo
        forcePopupIcon
        size="small"
        popupIcon={<ExpandMoreIcon />}
        id={`${name}-tag-autocomplete`}
        options={options}
        value={formik.values[name] || []}
        onChange={(e, value: Option | Option[] | null) => {
          const values = value ? value : null
          formik.setFieldValue(name, values)
        }}
        getOptionLabel={(option) =>
          String((optionMapping && optionMapping[option.id]) || option.name)
        }
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderTags={(value: Option[], getTagProps) => {
          if (value)
            return value.map((option: Option, index: number) => (
              <Chip
                {...getTagProps({ index })}
                label={
                  (optionMapping && optionMapping[option.id]) || option.name
                }
                deleteIcon={<CloseIcon />}
                size="small"
              />
            ))
          return null
        }}
        renderInput={(
          params: Omit<AutocompleteRenderInputParams, 'inputProps'>
        ) => {
          return (
            <TextField
              name={name}
              label={labelName}
              required={
                required &&
                (!formik.values[name] ||
                  (formik.values[name] && formik.values[name].length === 0))
              }
              error={formik.touched[name] && Boolean(formik.errors[name])}
              {...((!formik.values[name] ||
                (formik.values[name] && formik.values[name].length === 0)) && {
                placeholder: placeholder || `請選擇${labelName}`,
              })}
              {...params}
            />
          )
        }}
        aria-describedby={`${name}-tag-autocomplete-helper-text`}
        {...rest}
      />

      {/* HelperText */}
      {!disableHelperText &&
        formik.touched[name] &&
        Boolean(formik.errors[name]) && (
          <FormHelperText
            id={`${name}-tag-autocomplete-helper-text`}
            {...FormHelperTextProps}
          >
            {formik.errors[name] as string}
          </FormHelperText>
        )}
    </>
  )
}

const StyledWrapper = styled('div')(({ theme }) => ({
  '.MuiFormLabel-root': {
    fontSize: '1rem',
  },
  '.MuiFormControl-root .MuiChip-root': {
    borderRadius: Number(theme.shape.borderRadius) * 0.5,
    backgroundColor: theme.palette.primary.light4,
    color: theme.palette.primary.main,
    margin: theme.spacing(0, 0.375),
    '.MuiChip-deleteIcon': {
      fontSize: '1.25rem',
      color: theme.palette.primary.main,
    },
  },
  '.MuiInputBase-root': {
    backgroundColor: theme.palette.background.paper,
  },
  '.MuiInputLabel-asterisk': {
    display: 'none',
  },
  '.MuiOutlinedInput-root.placeholder': {
    color: theme.palette.gray.bd,
  },
}))

function FormikTagAutocomplete<T extends Values>(
  props: FormikTagAutocompleteProps<T>
) {
  const { className, sx, ...rest } = props
  return (
    <StyledWrapper
      className={`formik-input${className ? ' ' + className : ''}`}
      sx={sx}
    >
      <UnstyledFormikTagAutocomplete {...rest} />
    </StyledWrapper>
  )
}

export default memo(FormikTagAutocomplete) as typeof FormikTagAutocomplete
