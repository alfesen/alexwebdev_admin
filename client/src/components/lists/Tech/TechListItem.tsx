import {
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Box,
  AccordionActions,
  Button,
  Accordion
} from '@mui/material'
import { Typography } from '@mui/joy'
import TechForm from 'components/forms/TechForm'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import EditIcon from '@mui/icons-material/EditNote'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import { TTechItem } from '@/types'
import useRemove from 'hooks/useRemove'
import useEdit from 'hooks/useEdit'

const TechListItem = ({
  heading,
  icon,
  text,
  id,
  category,
  refetch
}: TTechItem) => {
  const { enterEditMode, submitAndExitEditMode, cancel, editMode } = useEdit(refetch)

  const { removeItem } = useRemove({
    category: 'tech',
    id: id,
    mutationKey: ['remove single tech'],
    queryKey: ['tech lists'],
    options: { objectKey: category }
  })

  return (
    <>
      {editMode ? (
        <TechForm onCancel={cancel} onSubmit={submitAndExitEditMode} id={id} />
      ) : (
        <Accordion disableGutters elevation={0} square sx={{ margin: 0 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography level="h3">{heading}</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
              <Avatar
                sx={{ overflow: 'visible', background: 'none' }}
                src={`/api/${icon}`}
              />
              <Box>
                <Typography level="h4">{heading}</Typography>
                <Typography>{text}</Typography>
              </Box>
            </Box>
            <AccordionActions>
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
            </AccordionActions>
          </AccordionDetails>
        </Accordion>
      )}
    </>
  )
}

export default TechListItem
