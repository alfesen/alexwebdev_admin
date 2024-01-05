import { Control, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { Box, Button, Stack } from '@mui/material'
import { Typography } from '@mui/joy'
import Input from './elements/Input'
import ImagePicker from './elements/ImagePicker'
import { useState } from 'preact/hooks'
import { nanoid } from 'nanoid'

const TechForm = () => {
  const [isSuccess, setIsSuccess] = useState<boolean | null>()

  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      heading: '',
      text: '',
      icon: undefined,
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData()
    formData.append('heading', watch('heading'))
    formData.append('text', watch('text'))
    formData.append('icon', data.icon)

    const response = await fetch('http://localhost:3000/tech', {
      method: 'POST',
      credentials: 'include',
      body: formData,
    })

    if (!response.ok) {
      return setIsSuccess(false)
    }
    return setIsSuccess(true)
  }

  const inputs = ['Heading', 'Text']

  return (
    <Stack spacing={2}>
      <Typography level="h3">Tech Form</Typography>
      <Box
        justifyContent={'center'}
        component="form"
        autoComplete="off"
        width={'100%'}
        onSubmit={handleSubmit(onSubmit)}
      >
        {inputs.map((input) => (
          <Input
            key={nanoid()}
            control={control as unknown as Control<FieldValues>}
            label={input}
            name={input.toLowerCase()}
          />
        ))}
        <ImagePicker
          label="Icon"
          name="icon"
          control={control as unknown as Control<FieldValues>}
        />
        <Button type="submit">Submit</Button>
        {isSuccess && <h1>Success</h1>}
        {!isSuccess && <h1>failed</h1>}
      </Box>
    </Stack>
  )
}

export default TechForm
