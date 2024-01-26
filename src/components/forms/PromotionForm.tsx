import { Stack, Box, Button } from '@mui/material'
import { Typography } from '@mui/joy'
import { Control, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Input from './elements/Input'
import ImagePicker from './elements/ImagePicker'
import { nanoid } from 'nanoid'
import useSubmitForm from '../../hooks/useSubmitForm'

const PromotionForm = ({
  id,
  onSubmit
}: {
  onSubmit: () => void
  id?: string
}) => {
  const { handleSubmit, control, watch } = useForm({
    defaultValues: id
      ? async () =>
          fetch(`${import.meta.env.VITE_SERVER_URL}/promotions/${id}`)
            .then((res) => res.json())
            .then((promotion: any) => promotion)
      : {
          text: '',
          image: undefined
        }
  })

  const submitHandler = useSubmitForm()

  const submitForm: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData()
    formData.append('text', watch('text'))
    formData.append('image', data.image)

    let query: FormData | {}

    if (typeof data.icon === 'string') {
      const newQuery: any = {}
      formData.forEach((value, key) => (newQuery[key] = value))
      query = newQuery
    } else {
      query = formData
    }

    await submitHandler(
      `/promotions${id ? '/' + id : ''}`,
      query,
      id ? 'PATCH' : 'POST'
    )

    onSubmit()
  }

  return (
    <Stack spacing={2}>
      <Typography level="h3">Promotion Form</Typography>
      <Box
        justifyContent={'center'}
        component="form"
        autoComplete="off"
        width={'100%'}
        onSubmit={handleSubmit(submitForm)}
      >
        <Input
          key={nanoid()}
          control={control as unknown as Control<FieldValues>}
          label="Text"
          name="text"
          multiline
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
