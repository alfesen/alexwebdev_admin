import useAuth from 'hooks/useAuth'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import UserMenu from './UserMenu'
import LanguageSelect from './LanguageSelect'
import UserButton from './UserButton'

const NavbarTooltip = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const { logoutHandler } = useAuth()

  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const logout = () => {
    logoutHandler()
    handleCloseUserMenu()
  }

  return (
    <Box sx={{ flexGrow: 0, display: 'flex', gap: 2 }}>
      <Tooltip title="Open settings">
        <>
          <LanguageSelect />
          <UserButton onClick={handleOpenUserMenu} />
        </>
      </Tooltip>
      <UserMenu
        anchorEl={anchorElUser}
        onClose={handleCloseUserMenu}
        actions={[{ action: logout, text: 'Logout' }]}
      />
    </Box>
  )
}

export default NavbarTooltip
