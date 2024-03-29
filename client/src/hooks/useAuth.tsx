import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import useSubmitForm from './useSubmitForm'
const useAuth = () => {
  const [isAuth, setIsAuth] = useState(
    !!Cookies.get(process.env.REACT_APP_LOGIN_COOKIE!)
  )

  const submitHandler = useSubmitForm()

  useEffect(() => {
    const checkForCookieChange = () => {
      setIsAuth(!!Cookies.get(process.env.REACT_APP_LOGIN_COOKIE!))
    }
    const intervalId = setInterval(checkForCookieChange, 1000)
    return () => clearInterval(intervalId)
  }, [isAuth])

  const loginHandler = (credentials: { email: string; password: string }) => {
    submitHandler('/users/signin', credentials, 'POST')
  }

  const logoutHandler = async () => {
    Cookies.remove(process.env.REACT_APP_LOGIN_COOKIE!)
  }

  return { isAuth, loginHandler, logoutHandler }
}

export default useAuth
