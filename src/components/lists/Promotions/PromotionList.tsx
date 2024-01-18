import { Sheet } from '@mui/joy'
import axios from 'axios'
import { useQuery } from 'react-query'
import PromotionListItem from './PromotionListItem'
import { nanoid } from 'nanoid'
import { useEffect, useState } from 'preact/hooks'

const PromotionList = () => {
  const [update, setUpdate] = useState<boolean>(false)

  const { data: promotions, isLoading } = useQuery({
    queryKey: ['promotion list'],
    queryFn: async () => {
      const { data: promotions } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/promotions`
      )
      return promotions
    },
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    setUpdate(false)
  }, [update])

  if (isLoading) return <></>

  return (
    <Sheet sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
      {promotions.map((p: any, index: number) => (
        <PromotionListItem
          key={nanoid()}
          index={index + 1}
          id={p.id}
          text={p.text}
          image={p.image}
          update={() => setUpdate(true)}
        />
      ))}
    </Sheet>
  )
}

export default PromotionList
