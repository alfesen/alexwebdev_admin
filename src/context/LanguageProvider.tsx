import { useState } from 'preact/compat'
import { ReactNode, createContext } from 'preact/compat'
import { TLanguageContext } from 'src/types'

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
