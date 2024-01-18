import { useEffect, useState} from 'preact/hooks'
import { Suspense, lazy } from 'preact/compat'
import { QueryClient, QueryClientProvider } from 'react-query'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Cookies from 'js-cookie'

const LoginPage = lazy(() => import('./components/layout/MainLayout'))
const MainLayout = lazy(() => import('./components/pages/LoginPage'))
const TechList = lazy(() => import('./components/lists/Tech/TechList') )
const PromotionList = lazy(() => import('./components/lists/Promotions/PromotionList') )

export function App() {
  const [isAuth, setIsAuth] = useState(
    !!Cookies.get(import.meta.env.VITE_LOGIN_COOKIE)
    )

    useEffect(() => {
      const checkForCookieChange = () => {
        setIsAuth(!!Cookies.get(import.meta.env.VITE_LOGIN_COOKIE))
      }
      const intervalId = setInterval(checkForCookieChange, 1000)
      return () => clearInterval(intervalId)
    }, [isAuth])
    
    const router = createBrowserRouter([
      {path: '/', element: <MainLayout />, children: [
        {path: '/tech', element: <TechList />},
        {path: '/promotions', element: <PromotionList />},
      ]}
    ])
    
    const client = new QueryClient()
    return (
      <>
      <Toaster />
      <QueryClientProvider client={client}>
        <Suspense fallback="Loading">
          {!isAuth ? <LoginPage /> : <RouterProvider router={router} />}
        </Suspense>
      </QueryClientProvider>
    </>
  )
}
