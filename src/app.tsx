import { Container, Divider, Stack } from '@mui/material'
import TechForm from './components/forms/TechForm'
import PromotionForm from './components/forms/PromotionForm'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from 'react-query'
import TechList from './components/lists/Tech/TechList'
import PromotionList from './components/lists/Promotions/PromotionList'
import { useEffect, useState } from 'preact/hooks'
import Cookies from 'js-cookie'
import LoginPage from './components/pages/LoginPage'

export function App() {
  const [isAuth, setIsAuth] = useState(
    !!Cookies.get(import.meta.env.VITE_LOGIN_COOKIE)
  )
  console.log(Cookies.get(import.meta.env.VITE_LOGIN_COOKIE))
  useEffect(() => {
    // Function to check for cookie changes
    const checkForCookieChange = () => {
      setIsAuth(!!Cookies.get(import.meta.env.VITE_LOGIN_COOKIE))
    }

    // Set up an interval to periodically check for cookie changes
    const intervalId = setInterval(checkForCookieChange, 1000) // Adjust the interval as needed

    // Clear the interval on component unmount to avoid memory leaks
    return () => clearInterval(intervalId)
  }, [isAuth])

  const client = new QueryClient()
  return (
    <>
      <Toaster />
      <QueryClientProvider client={client}>
        {!isAuth ? (
          <LoginPage />
        ) : (
          <Container maxWidth='md'>
            <Stack spacing={5}>
              <TechForm />
              <Divider />
              <PromotionForm />
              <Divider />
              <PromotionList />
              <Divider />
              <TechList></TechList>
            </Stack>
          </Container>
        )}
      </QueryClientProvider>
    </>
  )
}
