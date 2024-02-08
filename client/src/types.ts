import { Control, FieldValues } from 'react-hook-form'

export interface IErrorResponse {
  statusCode: number
  timestamp: string
  path: string
  message: string
}

export interface TInputBase {
  control: Control<FieldValues>
  name: string
  label: string
  rules?: {}
}

export interface TInput extends TInputBase {
  type?: string
  multiline?: boolean
}

export type TImagePicker = TInputBase

export type TMessage = {
  id: string
  email: string
  name: string
  message: string
  consent: boolean
  date: string
}

export type TPromotion = {
  index: number
  text: string
  image: string
  id: string
}

export type TTechItem = {
  heading: string
  icon: string
  text: string
  id: string
  category: string
}

export type TLanguageContext = {
  language: 'en' | 'pl'
  setLanguage: (lang: 'en' | 'pl') => void
}
