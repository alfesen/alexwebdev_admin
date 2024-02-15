import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

const UserMenu = ({
  anchorEl,
  onClose,
  actions
}: {
  anchorEl: any
  onClose: () => void
  actions?: { action: () => void; text: string }[]
}) => {
  return (
    <Menu
      sx={{ mt: '45px' }}
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={!!anchorEl}
      onClose={onClose}
    >
      {actions?.map((a) => {
        return (
          <MenuItem onClick={a.action}>
            <Typography textAlign="center">{a.text}</Typography>
          </MenuItem>
        )
      })}
    </Menu>
  )
}

export default UserMenu
