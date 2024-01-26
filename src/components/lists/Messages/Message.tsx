import MessageIcon from '@mui/icons-material/Mail'
import { Typography } from '@mui/joy'
import { Box, Button, Link } from '@mui/material'
import type { TMessage } from 'src/types'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import useRemove from 'hooks/useRemove'

const Message = ({ email, name, message, consent, date, id }: TMessage) => {
  const { removeItem } = useRemove({
    mutationKey: ['remove single message'],
    category: 'messages',
    id: id,
    queryKey: ['messages']
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
          onClick={removeItem}
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
