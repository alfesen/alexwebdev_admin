import { AspectRatio, Card, CardContent, Typography } from '@mui/joy'
import { Box, Button } from '@mui/material'
import { useMutation } from 'react-query'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useState } from 'preact/hooks'
import PromotionForm from '../../forms/PromotionForm'
import EditIcon from '@mui/icons-material/EditNote'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'

const PromotionListItem = ({
  index,
  text,
  image,
  id,
}: {
  index: number
  text: string
  image: string
  id: string
}) => {
  const [editMode, setEditMode] = useState<boolean>(false)

  const { mutate } = useMutation({
    mutationKey: ['remove single promotion'],
    mutationFn: async () => {
      try {
        const { data } = await axios.delete(
          `${import.meta.env.VITE_SERVER_URL}/promotions/${id}`,
          { withCredentials: true }
        )
        return toast.success(data.message)
      } catch (err) {
        if (err instanceof Error) {
          return toast.error(err.message)
        }
      }
    }
  })

  return (
    <Card sx={{ flex: 1 }}>
      {editMode ? (
        <PromotionForm id={id} />
      ) : (
        <>
          <AspectRatio minHeight={120} maxHeight={200}>
            <img
              src={`${import.meta.env.VITE_SERVER_URL}/${image}`}
              alt={text}
            />
          </AspectRatio>
          <CardContent sx={{ justifyContent: 'space-between' }}>
            <Typography>
              {index}. {text}
            </Typography>
            <Box display="flex" justifyContent="end">
              <Button
                onClick={() => setEditMode(true)}
                color="info"
                endIcon={<EditIcon />}
              >
                Edit
              </Button>
              <Button
                onClick={mutate}
                color="warning"
                endIcon={<DeleteSweepIcon />}
              >
                Remove
              </Button>
            </Box>
          </CardContent>
        </>
      )}
    </Card>
  )
}

export default PromotionListItem
