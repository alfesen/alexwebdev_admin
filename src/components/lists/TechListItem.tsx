import {
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Box,
  AccordionActions,
  Button,
  Accordion
} from "@mui/material"
import { Typography } from "@mui/joy"
import { useMutation } from "react-query"
import axios from "axios"
import toast from "react-hot-toast"
import TechForm from "../forms/TechForm"
import { useState } from "preact/hooks"

const TechListItem = ({
  heading,
  icon,
  text,
  id
}: {
  heading: string
  icon: string
  text: string
  id: string
}) => {
  const [editMode, setEditMode] = useState<boolean>(false)

  const { mutate } = useMutation({
    mutationKey: ["remove single tech"],
    mutationFn: async () => {
      try {
        const { data } = await axios.delete(
          `${import.meta.env.VITE_SERVER_URL}/tech/${id}`
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
    <>
      {editMode ? (
        <TechForm id={id} />
      ) : (
        <Accordion square sx={{ margin: 0 }}>
          <AccordionSummary>
            <Typography level="h3">{heading}</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
              <Avatar
                sx={{ overflow: "visible", background: "none" }}
                src={`${import.meta.env.VITE_SERVER_URL}/${icon}`}
              />
              <Box>
                <Typography level="h4">{heading}</Typography>
                <Typography>{text}</Typography>
              </Box>
            </Box>
            <AccordionActions>
              <Button onClick={() => setEditMode(true)} color="primary">
                Edit
              </Button>
              <Button onClick={mutate} color="warning">
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
