import { Box, InputLabel, Input as MuiInput } from '@mui/material'
import { ChangeEvent } from 'preact/compat'
import { Control, FieldValues, useController } from 'react-hook-form'

const Input = ({
  control,
  name,
  rules,
  type,
  label,
}: {
  control: Control<FieldValues>
  name: string
  label: string
  rules?: {}
  type?: string
}) => {
  const {
    field: { value, onChange },
  } = useController({ control, name, rules })

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //@ts-ignore
    onChange(e.target?.value)
    
  }
  return (
    <Box
      component="div"
      display={'flex'}
      flexDirection={'column'}
      marginY={3}
    >
      <InputLabel>{label}</InputLabel>
      <MuiInput
        sx={{
          padding: 0.2,
        }}
        type={type ?? 'text'}
        onChange={changeHandler}
        id={name}
        name={name}
        value={value}
      />
    </Box>
  )
}

export default Input
