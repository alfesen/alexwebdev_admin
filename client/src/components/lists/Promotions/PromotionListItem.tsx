import { AspectRatio, Card, CardContent, Typography } from '@mui/joy'
import { Box, Button } from '@mui/material'
import { useState } from 'react'
import PromotionForm from 'components/forms/PromotionForm'
import EditIcon from '@mui/icons-material/EditNote'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import { TPromotion } from '@/types'
import useRemove from 'hooks/useRemove'

const PromotionListItem = ({ index, text, image, id }: TPromotion) => {
  const [editMode, setEditMode] = useState<boolean>(false)

  const { removeItem } = useRemove({
    mutationKey: ['remove single promotion'],
    category: 'promotions',
    id: id,
    queryKey: ['promotion list']
  })

  return (
    <Card sx={{ flex: 1 }}>
      {editMode ? (
        <PromotionForm onSubmit={window.location.reload} id={id} />
      ) : (
        <>
          <AspectRatio minHeight={120} maxHeight={200}>
            <img
              src={`${process.env.REACT_APP_SERVER_URL}/${image}`}
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
                onClick={() => removeItem()}
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
