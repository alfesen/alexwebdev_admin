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