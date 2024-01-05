import { Container } from '@mui/material'
import TechForm from './components/forms/TechForm'
import PromotionForm from './components/forms/PromotionForm'
import LoginForm from './components/forms/LoginForm'

export function App() {
  return (
    <Container>
      <TechForm />
      <hr />
      <PromotionForm />
      <hr />
      <LoginForm />
    </Container>
  )
}
