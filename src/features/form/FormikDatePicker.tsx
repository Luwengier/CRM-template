import { memo, useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { FormikProps, getIn } from 'formik'
import { styled } from '@mui/material/styles'
import { TextFieldProps } from '@mui/material/TextField'
import InputLabel, { InputLabelProps } from '@mui/material/InputLabel'
import FormHelperText, {
  FormHelperTextProps,
} from '@mui/material/FormHelperText'
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers'

// Type
interface Values {
  [x: string]: any
}

interface FormikDatePickerProps<T extends Values>
  extends Omit<DatePickerProps<Dayjs>, 'value' | 'renderInput' | 'onChange'> {
  formik: FormikProps<T>
  name: string
  size?: TextFieldProps['size']
  variant?: TextFieldProps['variant']
  required?: boolean
  placeholder?: string
  labelName?: string
  asteriskRequired?: boolean
  disableHelperText?: boolean
  LabelProps?: InputLabelProps
  FormHelperTextProps?: FormHelperTextProps
}

// Component
function UnstyledFormikDatePicker<T extends Values = Values>({
  formik,
  name,
  size,
  variant,
  labelName,
  format,
  placeholder,
  required,
  asteriskRequired,
  disableHelperText,
  LabelProps,
  FormHelperTextProps,
  ...rest
}: FormikDatePickerProps<T>) {
  const registerField = formik.registerField
  const setFieldError = formik.setFieldError
  const value = getIn(formik.values, name)
  const error = getIn(formik.errors, name)

  useEffect(() => {
    registerField(name, {
      validate(value) {
        if (!value) return 'Please enter the correct time'
      },
    })
  }, [registerField, name, setFieldError])

  return (
    <>
      {/* Label */}
      {labelName && (
        <InputLabel
          htmlFor={`${name}-date-picker`}
          required={asteriskRequired}
          {...LabelProps}
        >
          {labelName}
        </InputLabel>
      )}

      {/* DateTimePicker */}
      <DatePicker
        format={format || 'YYYY-MM-DD'}
        value={value ? dayjs(Number(value)) : null}
        slotProps={{
          textField: {
            variant: variant || 'outlined',
            error: Boolean(error),
            size: size || 'small',
          },
        }}
        label={labelName}
        onChange={async (newValue, context) => {
          await formik.setFieldValue(name, newValue?.valueOf() || newValue)
          // formik.setFieldTouched(name, Boolean(newValue), Boolean(newValue))
          if (!newValue?.valueOf() || context.validationError) {
            const errorMessages = context.validationError
            setFieldError(
              name,
              errorMessages || 'Please enter the correct time'
            )
            registerField(name, {
              validate(value) {
                if (value && errorMessages) return errorMessages
              },
            })
          }
          if (Boolean(newValue) && !context.validationError) {
            setFieldError(name, undefined)
            registerField(name, { validate: undefined })
          }
        }}
        {...rest}
      />

      {/* HelperText */}
      {!disableHelperText && Boolean(error) && (
        <FormHelperText
          id={`${name}-date-picker-helper-text`}
          {...FormHelperTextProps}
        >
          {error as string}
        </FormHelperText>
      )}
    </>
  )
}

const StyledWrapper = styled('div')(({ theme }) => ({
  '.MuiTextField-root': { width: '100%' },
  '.MuiInputBase-root': {
    backgroundColor: theme.palette.background.paper,
  },
  '.MuiInputBase-input': {
    fontSize: '0.875rem',
    lineHeight: 1.5,
    height: 'unset',
    padding: '7.5px 12px',
  },
  '.MuiFormLabel-root': {
    fontWeight: 700,
    marginBottom: theme.spacing(0.5),
    fontSize: '0.875rem',
  },
  '.MuiFormLabel-asterisk': {
    color: theme.palette.error.main,
  },
}))

function FormikDatePicker<T extends Values>(props: FormikDatePickerProps<T>) {
  const { className, ...rest } = props
  return (
    <StyledWrapper
      className={`formik-input${className ? ' ' + className : ''}`}
    >
      <UnstyledFormikDatePicker {...rest} />
    </StyledWrapper>
  )
}

export default memo(FormikDatePicker) as typeof FormikDatePicker
