import { useState, createContext } from 'react'
import type { ReactNode } from 'react'
import { TLanguageContext } from '@/types'

export const LanguageContext = createContext<TLanguageContext>({
  language: 'en',
  setLanguage: (_lang: 'en' | 'pl') => {}
})

const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<'en' | 'pl'>('en')

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export default LanguageProvider
