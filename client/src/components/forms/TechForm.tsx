import { Control, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { Box, Button, Stack, MenuItem, Select } from '@mui/material'
import { Typography } from '@mui/joy'
import { useContext } from 'react'
import Input from './elements/Input'
import ImagePicker from './elements/ImagePicker'
import { nanoid } from 'nanoid'
import useSubmitForm from 'hooks/useSubmitForm'
import { LanguageContext } from 'context/LanguageProvider'

const TechForm = ({
  id,
  onSubmit,
  onCancel
}: {
  id?: string
  onCancel?: () => void
  onSubmit: () => void
}) => {
  const {
    handleSubmit,
    control,
    watch,
    register,
    formState: { defaultValues }
  } = useForm({
    defaultValues: id
      ? async () =>
          fetch(`/api/tech/${id}`)
            .then((res) => res.json())
            .then((tech: any) => tech)
      : {
          heading: '',
          text: '',
          category: 'frontend',
          icon: undefined
        }
  })

  const ctx = useContext(LanguageContext)

  const submitHandler = useSubmitForm()

  const submitForm: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData()

    formData.append('heading', watch('heading'))
    formData.append('text', watch('text'))
    formData.append('category', watch('category'))
    formData.append('icon', data.icon)

    let query: FormData | {}

    if (typeof data.icon === 'string') {
      const newQuery: any = {}
      formData.forEach((value, key) => (newQuery[key] = value))
      query = newQuery
    } else {
      query = formData
    }

    await submitHandler(
      `/tech${id ? '/' + id : ''}`,
      query,
      id ? 'PATCH' : 'POST'
    )

    onSubmit()
  }

  const inputs = [
    {
      name: 'heading',
      label: ctx.language === 'en' ? 'Heading' : 'Nazwa'
    },
    {
      name: 'text',
      label: ctx.language === 'en' ? 'Text' : 'text'
    }
  ]

  return (
    <Stack spacing={2}>
      <Typography level="h3">
        {ctx.language === 'en' ? 'Add Tech' : 'Dodaj Technologię'}
      </Typography>
      <Box
        justifyContent={'center'}
        component="form"
        autoComplete="off"
        width={'100%'}
        onSubmit={handleSubmit(submitForm)}
      >
        {defaultValues && defaultValues.category && (
          <Select
            {...register('category')}
            defaultValue={defaultValues?.category}
          >
            <MenuItem value="frontend">Frontend</MenuItem>
            <MenuItem value="backend">Backend</MenuItem>
            <MenuItem value="fullstack">Fullstack</MenuItem>
            <MenuItem value="testing">Testing</MenuItem>
          </Select>
        )}
        {inputs.map(({ name, label }) => (
          <Input
            key={nanoid()}
            control={control as unknown as Control<FieldValues>}
            label={label}
            name={name}
          />
        ))}
        <ImagePicker
          label={ctx.language === 'en' ? 'Icon' : 'Ikonka'}
          name="icon"
          control={control as unknown as Control<FieldValues>}
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

export default TechForm
