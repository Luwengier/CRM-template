import { memo } from 'react'
import { styled } from '@mui/material/styles'
import { lowerCase } from 'lodash-es'
import { FormikProps } from 'formik'
import TextField, {
  TextFieldProps,
  TextFieldVariants,
} from '@mui/material/TextField'

// Type
interface Values {
  [x: string]: any
}

interface FormikTextFieldProps<T extends Values>
  extends Omit<TextFieldProps, 'variant'> {
  variant?: TextFieldVariants
  formik: FormikProps<T>
  name: string
}

// Component
function UnstyledFormikTextField<T extends Values = Values>({
  formik,
  name,
  label,
  ...rest
}: FormikTextFieldProps<T>) {
  return (
    <TextField
      name={name}
      label={label}
      id={`${name}-input`}
      aria-describedby={`${name}-input-helper-text`}
      helperText={formik.touched[name] && (formik.errors[name] as string)}
      value={
        formik.values[name] ||
        (typeof formik.values[name] === 'number' ? 0 : '')
      }
      onChange={formik.handleChange}
      onBlur={() => {
        formik.setFieldTouched(name, true, formik.submitCount > 0)
      }}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      {...(label && { placeholder: `請輸入${lowerCase(label.toString())}` })}
      {...rest}
    />
  )
}

const StyledWrapper = styled('div')(({ theme }) => ({
  // '.MuiTextField-root': { width: '100%' },
  // '.MuiInputBase-root': {
  //   backgroundColor: theme.palette.background.paper
  // },
  // '.MuiInputBase-input': {
  //   fontSize: '0.875rem',
  //   lineHeight: 1.5,
  //   height: '1.5rem',
  //   padding: '8px 12px'
  // },
  // '.MuiFormLabel-root': {
  //   fontWeight: 700,
  //   fontSize: '0.875rem'
  // },
  // '.MuiFormLabel-asterisk': {
  //   color: theme.palette.error.main
  // }
}))

function FormikTextField<T extends Values>(props: FormikTextFieldProps<T>) {
  const { className, ...rest } = props
  return (
    <StyledWrapper
      className={`formik-input${className ? ' ' + className : ''}`}
    >
      <UnstyledFormikTextField {...rest} />
    </StyledWrapper>
  )
}

// const FormikTextField = styled(UnstyledFormikTextField)(({ theme }) => ({
//   // '.MuiInputLabel-asterisk': {
//   //   color: theme.palette.error.main,
//   //   paddingLeft: theme.spacing(0.25),
//   // },
//   // '.MuiOutlinedInput-root.placeholder': {
//   //   color: theme.palette.gray.bd,
//   // },
// }));

export default memo(FormikTextField) as typeof FormikTextField
