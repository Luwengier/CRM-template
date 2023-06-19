import { useState, useEffect, useContext, MouseEvent } from 'react'
import { useFormik, FormikHelpers } from 'formik'
import { useNavigate } from 'react-router'
import { AuthContext } from 'contexts/AuthContext'
import { alpha } from '@mui/material/styles'
import background from './background.svg'
import axios from 'axios'
import * as Yup from 'yup'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import FormikTextField from 'components/formik/FormikTextField'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const LoginSchema = Yup.object().shape({
  account: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
})

const Login = () => {
  const navigate = useNavigate()
  const [isSuccess, setIsSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { token, setToken, setRole, setUser } = useContext(AuthContext)

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleSubmit = async (
    values: Partial<FormValues>,
    helpers: FormikHelpers<Partial<FormValues>>
  ) => {
    try {
      // 獲取 Token
      const res = await axios.post<any>('/auth/login', values)

      const token = res.data.data.token
      axios.defaults.headers.common['Authorization'] = 'bearer ' + token

      setToken(token)
      // 獲取 使用者資訊
      const userInfoRes = await axios.get<any>('/auth/me', {
        headers: {
          Authorization: 'bearer ' + token,
        },
      })
      const user = userInfoRes.data.data
      const role = userInfoRes.data.data.role

      setRole(role)
      setUser(user)
      setIsSuccess(true)
    } catch (error: any) {
      console.log(error)
      const serverMsg = error?.response?.data?.message
      if (serverMsg) {
        helpers.setFieldError('email', serverMsg)
        helpers.setFieldError('password', serverMsg)
      } else {
        // enqueueError(error);
      }
    }
  }

  useEffect(() => {
    if (token && isSuccess) navigate('/map')
  }, [token, isSuccess, navigate])

  const formik = useFormik({
    initialValues: {},
    validateOnChange: false,
    validationSchema: LoginSchema,
    onSubmit: handleSubmit,
  })

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        position: 'relative',
        background: (theme) =>
          `linear-gradient(-30deg, ${theme.palette.gray.ff} 6%, 
          ${alpha(theme.palette.primary.main, 0.3)} 50%, ${alpha(
            theme.palette.secondary.light,
            0.2
          )})`,
      }}
    >
      <Box
        id="background-mask"
        sx={{
          width: '100%',
          height: '100%',
          backgroundImage: `url(${background})`,
        }}
      ></Box>

      <Paper
        sx={{
          p: 4,
          width: '50%',
          height: '50%',
          minWidth: 300,
          maxWidth: 400,
          minHeight: 400,
          maxHeight: 550,

          position: 'absolute',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',

          overflow: 'hidden',
          borderRadius: 4,
          backdropFilter: 'blur(3.2px)',
          bgcolor: (theme) => alpha(theme.palette.gray.ff, 0.24),
          border: (theme) => `5px solid ${theme.palette.gray.ff}`,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderBottomWidth: 8,
        }}
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <Stack height="100%" rowGap={2}>
          <Typography variant="h3" align="center" mt={5}>
            Login
          </Typography>

          <Stack
            mt={5}
            rowGap={4}
            sx={{
              '& .MuiTextField-root': {
                width: '100%',
                bgcolor: 'transparent',
                '& label.Mui-focused': {
                  color: '#A0AAB4',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#B2BAC2',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#B2BAC2',
                  },
                  '&:hover fieldset': {
                    borderColor: '#B2BAC2',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6F7E8C',
                  },
                },
              },
            }}
          >
            <FormikTextField
              label="使用者名稱"
              name="account"
              formik={formik}
              color="secondary"
            />
            <FormikTextField
              label="密碼"
              color="secondary"
              name="password"
              formik={formik}
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Stack mt="auto" mb={4}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              type="submit"
              sx={{
                borderRadius: '999px',
              }}
            >
              LOG IN
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  )
}

type FormValues = {
  email: string | undefined
  password: string | undefined
}

export default Login
