import { Container, Box } from '@mui/material'
import LoginForm from 'components/forms/LoginForm'
import LanguageSelect from '../layout/NavComponents/NavbarTooltip/LanguageSelect'

const LoginPage = () => {
  return (
    <Container maxWidth="xs">
      <LoginForm />
      <Box display='flex' justifyContent='end' marginY={3}>
        <LanguageSelect />
      </Box>
    </Container>
  )
}

export default LoginPage
