import { Stack, Box, Button } from '@mui/material'
import { Typography } from '@mui/joy'
import { Control, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Input from './elements/Input'
import ImagePicker from './elements/ImagePicker'
import { nanoid } from 'nanoid'
import toast from 'react-hot-toast'

const PromotionForm = () => {
  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      text: '',
      image: undefined,
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData()
    formData.append('text', watch('text'))
    formData.append('image', data.image)

    console.log(formData)
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/promotions`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    })

     if (!response.ok) {
       return toast.error("Promotion wasn't uploaded")
     }

     toast.success('Successfully uploaded promotion')
  }

  return (
    <Stack spacing={2}>
      <Typography level="h3">Promotion Form</Typography>
      <Box
        justifyContent={'center'}
        component="form"
        autoComplete="off"
        width={'100%'}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          key={nanoid()}
          control={control as unknown as Control<FieldValues>}
          label="Text"
          name="text"
        />
        <ImagePicker
          control={control as unknown as Control<FieldValues>}
          label="Image"
          name="image"
        />
        <Button type="submit">Submit</Button>
      </Box>
    </Stack>
  )
}

export default PromotionForm
