import { Container, Divider, Stack } from '@mui/material'
import TechForm from './components/forms/TechForm'
import PromotionForm from './components/forms/PromotionForm'
import LoginForm from './components/forms/LoginForm'
import { Toaster } from 'react-hot-toast'

export function App() {
  return (
    <>
      <Toaster />
      <Container>
        <Stack spacing={5}>
          <TechForm />
          <Divider />
          <PromotionForm />
          <Divider />
          <LoginForm />
        </Stack>
      </Container>
    </>
  )
}
