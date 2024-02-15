import { useState, createContext, useLayoutEffect } from 'react'
import type { ReactNode } from 'react'
import type { TLanguageContext } from '@/types'
import Cookies from 'js-cookie'

type Language = 'en' | 'pl'

export const LanguageContext = createContext<TLanguageContext>({
  language: 'en',
  setLanguage: (_lang: Language) => {}
})

const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en')

  useLayoutEffect(() => {
    const existingCookie = Cookies.get('lang') as Language

    if (existingCookie) {
      return setLanguage(existingCookie)
    }

    Cookies.set('lang', language)
  }, [language])

  const changeLanguageHandler = (lang: Language) => {
    setLanguage(lang)
    Cookies.set('lang', lang)
  }

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: changeLanguageHandler }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export default LanguageProvider
