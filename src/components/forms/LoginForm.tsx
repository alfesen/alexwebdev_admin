import { Box, Button, Stack } from '@mui/material'
import { Typography } from '@mui/joy'
import { Control, FieldValues, useForm } from 'react-hook-form'
import Input from './elements/Input'
import { nanoid } from 'nanoid'

const LoginForm = () => {
  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async () => {
    const credentials = {
      email: watch('email'),
      password: watch('password'),
    }
    
    const response = await fetch('http://localhost:3000/users/signin', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
    console.log(response)
  }

  return (
    <Stack spacing={2}>
      <Typography level="h3">Login Form</Typography>
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
          label="Password"
          name="password"
        />
        <Button type="submit">Submit</Button>
      </Box>
    </Stack>
  )
}

export default LoginForm
