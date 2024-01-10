import { Box, InputLabel, Input, Button } from '@mui/material'
import { RefObject } from 'preact'
import { TargetedEvent } from 'preact/compat'
import { useRef } from 'preact/hooks'
import { useController } from 'react-hook-form'
import { TImagePicker } from '../../../types'

const ImagePicker = ({ name, control, rules, label }: TImagePicker) => {
  const { field } = useController({ name, control, rules })
  const ref: RefObject<HTMLDivElement> = useRef(null)

  const handleFileButton = () => {
    const input = ref.current?.children[0] as HTMLInputElement
    input.click()
  }

  const handleImageChange = (
    e: TargetedEvent<HTMLInputElement, FormDataEvent>
  ) => {
    const selectedImage = (
      e.target as unknown as TargetedEvent<HTMLInputElement, FormDataEvent> & {
        files: File[]
      }
    )?.files[0] as File
    if (selectedImage) {
      const reader = new FileReader()
      reader.readAsDataURL(selectedImage)
      field.onChange(selectedImage)
    }
  }

  return (
    <Box
      component="div"
      sx={{
        mb: 2,
      }}
      gap={0.5}
      display="flex"
      alignItems="center"
    >
      <InputLabel>{label}</InputLabel>
      <Input
        onChange={handleImageChange}
        ref={ref}
        type="file"
        sx={{ display: 'none' }}
      />
      <Button onClick={handleFileButton} color="info">
        Choose the file
      </Button>
    </Box>
  )
}

export default ImagePicker
