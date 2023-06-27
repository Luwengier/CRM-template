import { memo } from 'react'
import { FormikProps, getIn } from 'formik'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Slider, { SliderProps } from '@mui/material/Slider'
import { InputLabelProps } from '@mui/material/InputLabel'

// Type
interface Values {
  [x: string]: any
}

interface FormikSliderProps<T extends Values> extends SliderProps {
  formik: FormikProps<T>
  name: string
  label?: string
  required?: boolean
  showValue?: boolean
  LabelProps?: InputLabelProps
}

// Component
function UnstyledFormikSlider<T extends Values = Values>({
  formik,
  name,
  label,
  required,
  showValue,
  LabelProps,
  ...rest
}: FormikSliderProps<T>) {
  const value = getIn(formik.values, name)
  return (
    <Box display="flex" columnGap={3.5} width="100%">
      <Slider
        name={name}
        id={`${name}-slider`}
        aria-describedby={`${name}-slider-label`}
        value={value || 0}
        onChange={formik.handleChange}
        {...rest}
      />
      {showValue && (
        <Typography
          minWidth="3rem"
          variant="body1"
          fontWeight={500}
          alignSelf="center"
          noWrap
        >
          {value} %
        </Typography>
      )}
    </Box>
  )
}

// const FormikSlider = styled(UnstyledFormikSlider)(({ theme }) => ({}))

export default memo(UnstyledFormikSlider) as typeof UnstyledFormikSlider
