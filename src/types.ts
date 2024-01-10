import { Control, FieldValues } from 'react-hook-form'

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

