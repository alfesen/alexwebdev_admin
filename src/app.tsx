import { Container, Divider, Stack } from '@mui/material'
import TechForm from './components/forms/TechForm'
import PromotionForm from './components/forms/PromotionForm'
import LoginForm from './components/forms/LoginForm'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from 'react-query'
import TechList from './components/lists/Tech/TechList'
import PromotionList from './components/lists/Promotions/PromotionList'

export function App() {
  const client = new QueryClient()
  return (
    <>
      <Toaster />
      <QueryClientProvider client={client}>
        <Container>
          <Stack spacing={5}>
            <TechForm />
            <Divider />
            <PromotionForm />
            <Divider />
            <LoginForm />
            <PromotionList />
            <TechList></TechList>
          </Stack>
        </Container>
      </QueryClientProvider>
    </>
  )
}
