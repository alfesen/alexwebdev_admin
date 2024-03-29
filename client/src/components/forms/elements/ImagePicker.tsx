import { Box, InputLabel, Input, Button } from '@mui/material'
import { type ChangeEvent, type RefObject, useContext } from 'react'
import { useRef } from 'react'
import { useController } from 'react-hook-form'
import { TImagePicker } from '@/types'
import { LanguageContext } from '../../../context/LanguageProvider'

const ImagePicker = ({ name, control, rules, label }: TImagePicker) => {
  const { field } = useController({ name, control, rules })
  const ref: RefObject<HTMLDivElement> = useRef(null)

  const handleFileButton = () => {
    const input = ref.current?.children[0] as HTMLInputElement
    input.click()
  }

  const ctx = useContext(LanguageContext)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = (
      e.target as unknown as ChangeEvent<HTMLInputElement> & {
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
        mb: 2
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
        {ctx.language === 'en' ? 'Choose the file' : 'Wybierz plik'}
      </Button>
    </Box>
  )
}

export default ImagePicker
