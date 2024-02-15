import { Stack, Box, Button } from '@mui/material'
import { Typography } from '@mui/joy'
import { Control, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Input from './elements/Input'
import ImagePicker from './elements/ImagePicker'
import { nanoid } from 'nanoid'
import useSubmitForm from 'hooks/useSubmitForm'
import { useContext } from 'react'
import { LanguageContext } from 'context/LanguageProvider'

const PromotionForm = ({
  id,
  onSubmit,
  onCancel
}: {
  onSubmit: () => void
  id?: string
  onCancel?: () => void
}) => {
  const { handleSubmit, control, watch } = useForm({
    defaultValues: id
      ? async () =>
          fetch(`/api/promotions/${id}`)
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
    formData.append('enText', watch('enText'))
    formData.append('plText', watch('plText'))
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

  const ctx = useContext(LanguageContext)

  return (
    <Stack spacing={2}>
      <Typography level="h3">
        {ctx.language === 'en' ? 'Promotion Form' : 'Formularz Promocji'}
      </Typography>
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
          label={ctx.language === 'en' ? 'English Text' : 'Angielski Tekst'}
          name="enText"
          multiline
        />
        <Input
          key={nanoid()}
          control={control as unknown as Control<FieldValues>}
          label={ctx.language === 'en' ? 'Polish Text' : 'Polski Tekst'}
          name="plText"
          multiline
        />
        <ImagePicker
          control={control as unknown as Control<FieldValues>}
          label={ctx.language === 'en' ? 'Image' : 'Obrazek'}
          name="image"
        />
        <Button type="submit">
          {ctx.language === 'en' ? 'Submit' : 'Wyślij'}
        </Button>
        {onCancel && (
          <Button type="button" onClick={onCancel}>
            {ctx.language === 'en' ? 'Cancel' : 'Anuluj'}
          </Button>
        )}
      </Box>
    </Stack>
  )
}

export default PromotionForm
