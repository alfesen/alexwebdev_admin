import { AspectRatio, Card, CardContent, Typography } from '@mui/joy'
import { Box, Button } from '@mui/material'
import { useMutation } from 'react-query'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useState } from 'preact/hooks'
import PromotionForm from '../../forms/PromotionForm'
import EditIcon from '@mui/icons-material/EditNote'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import { client } from '../../../app'
import { Updater } from 'react-query/types/core/utils'
import { TPromotion } from 'src/types'

const PromotionListItem = ({ index, text, image, id }: TPromotion) => {
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
    },
    onMutate: async () => {
      await client.cancelQueries({ queryKey: ['promotion list'] })
      await client.getQueryData(['promotion list'])
      await client.setQueryData(
        ['promotion list'],
        (old: Updater<TPromotion[], any>) =>
          old.filter((m: TPromotion) => m.id !== id)
      )
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
