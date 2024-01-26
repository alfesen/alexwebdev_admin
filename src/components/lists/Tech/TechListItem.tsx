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
import TechForm from '../../forms/TechForm'
import { useState } from 'preact/hooks'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import EditIcon from '@mui/icons-material/EditNote'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import { TTechItem } from 'src/types'
import useRemove from 'hooks/useRemove'

const TechListItem = ({ heading, icon, text, id, category }: TTechItem) => {
  const [editMode, setEditMode] = useState<boolean>(false)

  const { removeItem } = useRemove({
    category: 'tech',
    id: id,
    mutationKey: ['remove single tech'],
    queryKey: ['tech lists'],
    options: { objectKey: category }
  })

  // const { mutate } = useMutation({
  //   mutationKey: ['remove single tech'],
  //   mutationFn: async () => {
  //     try {
  //       const { data } = await axios.delete(
  //         `${import.meta.env.VITE_SERVER_URL}/tech/${id}`
  //       )
  //       return toast.success(data.message)
  //     } catch (err) {
  //       if (err instanceof Error) {
  //         return toast.error(err.message)
  //       }
  //     }
  //   },
  //   onMutate: async () => {
  //     await client.cancelQueries({ queryKey: ['tech lists'] })
  //     const previousData = (await client.getQueryData([
  //       'tech lists'
  //     ])) as Record<string, TTechItem[]>
  //     const newData = {
  //       ...previousData,
  //       [category]: previousData[category].filter((t: TTechItem) => t.id !== id)
  //     }
  //     client.setQueryData(['tech lists'], newData)
  //     return { previousData, newData }
  //   }
  // })

  return (
    <>
      {editMode ? (
        <TechForm id={id} />
      ) : (
        <Accordion disableGutters elevation={0} square sx={{ margin: 0 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography level="h3">{heading}</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
              <Avatar
                sx={{ overflow: 'visible', background: 'none' }}
                src={`${import.meta.env.VITE_SERVER_URL}/${icon}`}
              />
              <Box>
                <Typography level="h4">{heading}</Typography>
                <Typography>{text}</Typography>
              </Box>
            </Box>
            <AccordionActions>
              <Button
                onClick={() => setEditMode(true)}
                color="info"
                endIcon={<EditIcon />}
              >
                Edit
              </Button>
              <Button
                onClick={removeItem}
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
