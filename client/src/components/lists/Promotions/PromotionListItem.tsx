import { AspectRatio, Card, CardContent, Typography } from '@mui/joy'
import { Box, Button } from '@mui/material'
import PromotionForm from 'components/forms/PromotionForm'
import EditIcon from '@mui/icons-material/EditNote'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import { TPromotion } from '@/types'
import useRemove from 'hooks/useRemove'
import useEdit from 'hooks/useEdit'

const PromotionListItem = ({ index, text, image, id, refetch }: TPromotion) => {
  const { enterEditMode, submitAndExitEditMode, cancel, editMode } =
    useEdit(refetch)

  const { removeItem } = useRemove({
    mutationKey: ['remove single promotion'],
    category: 'promotions',
    id: id,
    queryKey: ['promotion list']
  })
 
  
  return (
    <Card sx={{ flex: 1 }}>
      {editMode ? (
        <PromotionForm
          onCancel={cancel}
          onSubmit={submitAndExitEditMode}
          id={id}
        />
      ) : (
        <>
          <AspectRatio minHeight={120} maxHeight={200}>
            <img src={`/api/${image}`} alt={text} />
          </AspectRatio>
          <CardContent sx={{ justifyContent: 'space-between' }}>
            <Typography>
              {index}. {text}
            </Typography>
            <Box display="flex" justifyContent="end">
              <Button
                onClick={enterEditMode}
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
