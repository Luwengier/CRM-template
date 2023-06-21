import { memo } from 'react'
import { styled } from '@mui/material/styles'
import { FormikProps, getIn } from 'formik'
import dayjs, { Dayjs } from 'dayjs'

import FormHelperText, {
  FormHelperTextProps,
} from '@mui/material/FormHelperText'
import InputLabel, { InputLabelProps } from '@mui/material/InputLabel'
import { TextFieldProps } from '@mui/material/TextField'
import { TimePicker, TimePickerProps } from '@mui/x-date-pickers'

// Type
interface Values {
  [x: string]: any
}

interface FormikTimePickerProps<T extends Values>
  extends Omit<TimePickerProps<Dayjs>, 'value' | 'renderInput' | 'onChange'> {
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
function UnstyledFormikTimePicker<T extends Values = Values>({
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
}: FormikTimePickerProps<T>) {
  const registerField = formik.registerField
  const setFieldError = formik.setFieldError
  const valueByGetIn = getIn(formik.values, name)
  const error = getIn(formik.errors, name)
  const touched = getIn(formik.touched, name)

  // useEffect(() => {
  //   registerField(name, {
  //     validate(value) {
  //       if (!value) return 'Please enter the correct time'
  //     }
  //   })
  // }, [registerField, name, setFieldError])

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
      <TimePicker
        format={format || 'HH:mm'}
        value={valueByGetIn ? dayjs(Number(valueByGetIn)) : null}
        slotProps={{
          textField: {
            variant: variant || 'outlined',
            error: Boolean(error),
            size: size || 'small',
          },
        }}
        onChange={async (newValue, context) => {
          await formik.setFieldValue(name, newValue?.valueOf() || newValue)
          if (!newValue?.valueOf() || context.validationError) {
            const errorMessages = context.validationError
            setFieldError(name, errorMessages || '請輸入正確的時間格式')
            registerField(name, {
              validate(value) {
                if ((value || valueByGetIn) && errorMessages)
                  return errorMessages
              },
            })
          }
          if (Boolean(newValue) && !context.validationError) {
            setFieldError(name, undefined)
            registerField(name, {
              validate(value) {
                return undefined
              },
            })
          }
        }}
        {...rest}
      />

      {/* HelperText */}
      {!disableHelperText && Boolean(error) && Boolean(touched) && (
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
    height: '1.5rem',
    padding: '8px 12px',
  },
  '.MuiFormLabel-root': {
    fontWeight: 700,
    fontSize: '0.875rem',
  },
  '.MuiFormLabel-asterisk': {
    color: theme.palette.error.main,
  },
}))

function FormikTimePicker<T extends Values>(props: FormikTimePickerProps<T>) {
  const { className, ...rest } = props
  return (
    <StyledWrapper
      className={`formik-input${className ? ' ' + className : ''}`}
    >
      <UnstyledFormikTimePicker {...rest} />
    </StyledWrapper>
  )
}

export default memo(FormikTimePicker) as typeof FormikTimePicker
