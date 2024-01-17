import { useQuery } from "react-query"
import axios from "axios"
import TechListItem from "./TechListItem"
import { nanoid } from "nanoid"
import { Box, Stack } from "@mui/material"
import { Typography } from "@mui/joy"
import { capitalize } from "string-ts"

const TechList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["tech lists"],
    queryFn: async () => {
      const { data: categories } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/tech`
      )
      return categories
    },
    refetchOnWindowFocus: false
  })

  if (isLoading) return <></>

  const keys = Object.keys(data)

  return (
    <Stack gap={3}>
      {keys.map((k) => {
        return (
          <Box>
            <Typography level="h3" marginBottom={1.4}>
              {capitalize(k)}
            </Typography>
            {data[k].map((item: any) => (
              <TechListItem
                heading={item.heading}
                icon={item.icon}
                text={item.text}
                id={item._id}
                key={nanoid()}
              />
            ))}
          </Box>
        )
      })}
    </Stack>
  )
}

export default TechList
