import { Box, Button, Stack } from '@mui/material'
import { Typography } from '@mui/joy'
import { Control, FieldValues, useForm } from 'react-hook-form'
import Input from './elements/Input'
import { nanoid } from 'nanoid'
import useAuth from 'hooks/useAuth'
import { useContext } from 'react'
import { LanguageContext } from 'context/LanguageProvider'

const LoginForm = () => {
  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const ctx = useContext(LanguageContext)
  const { loginHandler } = useAuth()

  const onSubmit = async () => {
    const credentials = {
      email: watch('email'),
      password: watch('password')
    }

    loginHandler(credentials)
  }

  return (
    <Stack spacing={2}>
      <Typography level="h3">Login</Typography>
      <Box
        justifyContent={'center'}
        component="form"
        width={'100%'}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          key={nanoid()}
          control={control as unknown as Control<FieldValues>}
          label="Email"
          name="email"
        />
        <Input
          key={nanoid()}
          type="password"
          control={control as unknown as Control<FieldValues>}
          label={ctx.language === 'en' ? 'Password' : 'Hasło'}
          name="password"
        />
        <Button type="submit">
          {ctx.language === 'en' ? 'Submit' : 'Zaloguj'}
        </Button>
      </Box>
    </Stack>
  )
}

export default LoginForm
