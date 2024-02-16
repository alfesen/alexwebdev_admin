import { useQuery } from 'react-query'
import axios from 'axios'
import TechListItem from './TechListItem'
import { nanoid } from 'nanoid'
import { Box, Button, Stack } from '@mui/material'
import { Typography } from '@mui/joy'
import { capitalize } from 'string-ts'
import useModal from 'hooks/useModal'
import TechForm from 'components/forms/TechForm'
import Modal from 'components/modal/Modal'
import { useContext } from 'react'
import { LanguageContext } from 'context/LanguageProvider'

const TechList = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['tech lists'],
    queryFn: async () => {
      const { data: categories } = await axios.get(
        `/api/tech`
      )
      return categories
    },
    refetchOnWindowFocus: false
  })

  const ctx = useContext(LanguageContext)

  const { isModalOpen, openModal, closeModal } = useModal()

  if (isLoading) return <></>

  const keys = Object.keys(data)

  return (
    <>
      <Modal open={isModalOpen} onClose={closeModal}>
        <TechForm
          onSubmit={() => {
            closeModal()
            refetch()
          }}
        />
      </Modal>
      <Stack gap={3}>
        {keys.map((k) => {
          return (
            <Box key={nanoid()}>
              <Typography level="h3" marginBottom={1.4}>
                {capitalize(k)}
              </Typography>
              {data[k].map(({category, heading, icon, plText, enText,  _id}: any) => (
                <TechListItem
                  refetch={refetch}
                  category={category}
                  heading={heading}
                  icon={icon}
                  text={ctx.language === 'en' ? enText : plText}
                  id={_id}
                  key={nanoid()}
                />
              ))}
            </Box>
          )
        })}
        <Box textAlign={'center'} marginY={3}>
          <Button onClick={openModal}>Add new</Button>
        </Box>
      </Stack>
    </>
  )
}

export default TechList
