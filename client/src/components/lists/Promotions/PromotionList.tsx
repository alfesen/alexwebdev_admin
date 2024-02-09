import { Sheet } from '@mui/joy'
import axios from 'axios'
import { useQuery } from 'react-query'
import PromotionListItem from './PromotionListItem'
import { nanoid } from 'nanoid'
import Modal from 'components/modal/Modal'
import useModal from 'hooks/useModal'
import PromotionForm from 'components/forms/PromotionForm'
import { Box, Button } from '@mui/material'

const PromotionList = () => {
  const { isModalOpen, closeModal, openModal } = useModal()

  const {
    data: promotions,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['promotion list'],
    queryFn: async () => {
      const { data: promotions } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/promotions`
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
        {promotions.map((p: any, index: number) => (
          <PromotionListItem
            refetch={refetch}
            key={nanoid()}
            index={index + 1}
            id={p.id}
            text={p.text}
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
