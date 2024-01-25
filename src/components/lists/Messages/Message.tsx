import MessageIcon from '@mui/icons-material/Mail'
import { Typography } from '@mui/joy'
import { Box, Button, Link } from '@mui/material'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'
import type { TMessage } from 'src/types'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import { client } from '../../../app'
import { Updater } from 'react-query/types/core/utils'
const Message = ({ email, name, message, consent, date, id }: TMessage) => {
  const { mutate } = useMutation({
    mutationKey: ['remove single message'],
    mutationFn: async () => {
      try {
        const { data } = await axios.delete(
          `${import.meta.env.VITE_SERVER_URL}/messages/${id}`,
          { withCredentials: true }
        )
        return toast.success(data.message)
      } catch (err) {
        if (err instanceof Error) {
          return toast.error(err.message)
        }
      }
    },
    onMutate: async () => {
      await client.cancelQueries({ queryKey: ['messages'] })
      await client.getQueryData(['messages'])
      await client.setQueryData(['messages'], (old: Updater<TMessage[], any>) =>
        old.filter((m: TMessage) => m.id !== id)
      )
    }
  })

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      alignItems={'center'}
      gap={3}
      padding={1}
    >
      <MessageIcon />
      <Box minWidth="320px" overflow="hidden">
        <Typography component="sub" level="body-sm">
          {date}
        </Typography>
        <Typography level="title-lg">{name}</Typography>
        <Link component="a" href={`mailto:${email}`}>
          {email}
        </Link>
        <Typography>
          <Typography fontWeight={600}>Message: </Typography>
          {message}
        </Typography>
        <Typography>
          <Typography fontWeight={600}>Consent: </Typography>
          {consent ? <span>✅</span> : <span>🔴</span>}
        </Typography>
      </Box>
      <Box
        display={'flex'}
        justifyContent={'end'}
        flex={1}
        alignItems={'center'}
      >
        <Button
          sx={{ height: 100 }}
          onClick={mutate}
          color="warning"
          endIcon={<DeleteSweepIcon />}
        >
          Remove
        </Button>
      </Box>
    </Box>
  )
}

export default Message
