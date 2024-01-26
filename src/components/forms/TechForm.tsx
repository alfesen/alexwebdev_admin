import { Control, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { Box, Button, Stack, MenuItem, Select } from '@mui/material'
import { Typography } from '@mui/joy'
import Input from './elements/Input'
import ImagePicker from './elements/ImagePicker'
import { nanoid } from 'nanoid'
import useSubmitForm from '../../hooks/useSubmitForm'

const TechForm = ({ id, onSubmit }: { id?: string; onSubmit: () => void }) => {
  const {
    handleSubmit,
    control,
    watch,
    register,
    formState: { defaultValues }
  } = useForm({
    defaultValues: id
      ? async () =>
          fetch(`${import.meta.env.VITE_SERVER_URL}/tech/${id}`)
            .then((res) => res.json())
            .then((tech: any) => tech)
      : {
          heading: '',
          text: '',
          category: 'frontend',
          icon: undefined
        }
  })

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

  const inputs = ['Heading', 'Text']

  return (
    <Stack spacing={2}>
      <Typography level="h3">Tech Form</Typography>
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
      </Box>
    </Stack>
  )
}

export default TechForm
