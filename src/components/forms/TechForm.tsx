import { Control, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { Box, Button, Stack, MenuItem, Select } from '@mui/material'
import { Typography } from '@mui/joy'
import Input from './elements/Input'
import ImagePicker from './elements/ImagePicker'
import { nanoid } from 'nanoid'
import useSubmitForm from '../../hooks/useSubmitForm'

const TechForm = () => {
  const { handleSubmit, control, watch, register } = useForm({
    defaultValues:  {
      heading: '',
      text: '',
      category: 'frontend',
      icon: undefined,
    },
  })

  const submitHandler = useSubmitForm()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData()

    formData.append('heading', watch('heading'))
    formData.append('text', watch('text'))
    formData.append('category', watch('category'))
    formData.append('icon', data.icon)

    submitHandler('/tech', formData)
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
        <Select
          {...register('category')}
          value={watch('category')}
        >
          <MenuItem value="frontend">Frontend</MenuItem>
          <MenuItem value="backend">Backend</MenuItem>
          <MenuItem value="fullstack">Fullstack</MenuItem>
          <MenuItem value="testing">Testing</MenuItem>
        </Select>
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
