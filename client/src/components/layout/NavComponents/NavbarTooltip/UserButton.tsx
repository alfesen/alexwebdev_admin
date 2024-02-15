import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'

const UserButton = ({ onClick }: { onClick: (event: any) => void }) => {
  return (
    <IconButton onClick={onClick} sx={{ p: 0 }}>
      <Avatar />
    </IconButton>
  )
}

export default UserButton
