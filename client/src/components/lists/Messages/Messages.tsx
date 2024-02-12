import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query'
import Message from './Message'
import { TMessage } from '@/types'
import { Sheet } from '@mui/joy'
import { Divider } from '@mui/material'

const Messages = () => {
  const {
    data: messages,
    isLoading,
    error
  } = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const { data: messages } = await axios.get(
        `/api/messages`,
        { withCredentials: true }
      )
      return messages as TMessage[]
    },
    refetchOnWindowFocus: false,
    retry: false
  })

  if (error || (!isLoading && !messages) || !messages) {
    if (error) {
      const { message: errorMessage } = (error as unknown as AxiosError)
        .response?.data as { message: string }
      toast.error(errorMessage)
    }
    return <></>
  }

  if ((!isLoading && !messages) || !messages) {
    return <></>
  }

  return (
    <Sheet variant="plain" sx={{ background: 'none' }}>
      {messages.map((m, index) => (
        <>
          <Message {...m} />
          {!!messages[index + 1] && <Divider sx={{ marginY: '1em' }} />}
        </>
      ))}
    </Sheet>
  )
}

export default Messages
