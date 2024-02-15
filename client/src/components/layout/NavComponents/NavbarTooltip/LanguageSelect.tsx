import { useContext, type ChangeEvent } from 'react'
import { LanguageContext } from 'context/LanguageProvider'
import { NativeSelect } from '@mui/material'

const LanguageSelect = () => {
  const ctx = useContext(LanguageContext) 
 const changeLanguageHandler = (
    e: ChangeEvent<HTMLSelectElement> & { target: { value: 'en' | 'pl' } }
  ): void => {
    ctx.setLanguage(e.target.value)
  }

  return (
    <NativeSelect value={ctx.language} onChange={changeLanguageHandler}>
      <option value="en">En</option>
      <option value="pl">Pl</option>
    </NativeSelect>
  )
}

export default LanguageSelect
