import { QueryClient, QueryClientProvider } from 'react-query'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import MainLayout from './components/layout/MainLayout'
import TechList from './components/lists/Tech/TechList'
import PromotionList from './components/lists/Promotions/PromotionList'
import LoginPage from './components/pages/LoginPage'
import useAuth from './hooks/useAuth'
import Messages from 'components/lists/Messages/Messages'
import LanguageProvider from './context/LanguageProvider'

export const client = new QueryClient()

export function App() {
  const { isAuth } = useAuth()
  console.log(process.env)
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/tech', element: <TechList /> },
        { path: '/promotions', element: <PromotionList /> },
        { path: '/messages', element: <Messages /> }
      ]
    }
  ])

  return (
    <>
      <Toaster />
      <LanguageProvider>
        <QueryClientProvider client={client}>
          {!isAuth ? <LoginPage /> : <RouterProvider router={router} />}
        </QueryClientProvider>
      </LanguageProvider>
    </>
  )
}
