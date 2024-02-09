import { Control, FieldValues } from 'react-hook-form'
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query'

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
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>
}

export type TTechItem = {
  heading: string
  icon: string
  text: string
  id: string
  category: string
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>
}

export type TLanguageContext = {
  language: 'en' | 'pl'
  setLanguage: (lang: 'en' | 'pl') => void
}
