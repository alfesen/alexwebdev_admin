import { Sheet } from '@mui/joy'
import axios from 'axios'
import { useQuery } from 'react-query'
import PromotionListItem from './PromotionListItem'
import { nanoid } from 'nanoid'
import Modal from 'components/modal/Modal'
import useModal from 'hooks/useModal'
import PromotionForm from 'components/forms/PromotionForm'
import { Box, Button } from '@mui/material'
import { useContext } from 'react'
import { LanguageContext } from 'context/LanguageProvider'

const PromotionList = () => {
  const { isModalOpen, closeModal, openModal } = useModal()
  const ctx = useContext(LanguageContext)

  const {
    data: promotions,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['promotion list'],
    queryFn: async () => {
      const { data: promotions } = await axios.get(
        `/api/promotions`
      )
      return promotions
    },
    refetchOnWindowFocus: false
  })
  if (isLoading) return <></>

  return (
    <>
      <Modal open={isModalOpen} onClose={closeModal}>
        <PromotionForm
          onSubmit={() => {
            closeModal()
            refetch()
          }}
        />
      </Modal>
      <Sheet sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        {!isLoading &&
          promotions.length > 0 &&
          promotions.map((p: any, index: number) => (
            <PromotionListItem
              refetch={refetch}
              key={nanoid()}
              index={index + 1}
              id={p.id}
              text={ctx.language === 'en' ? p.enText : p.plText}
              image={p.image}
            />
          ))}
      </Sheet>
      <Box textAlign={'center'} marginY={3}>
        <Button onClick={openModal}>Add new</Button>
      </Box>
    </>
  )
}

export default PromotionList
