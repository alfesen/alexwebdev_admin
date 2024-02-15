import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Tooltip from '@mui/material/Tooltip'
import useAuth from '../../hooks/useAuth'
import { useState, useContext } from 'react'
import { LanguageContext } from '../../context/LanguageProvider'
import MobileNavigation from './NavComponents/MobileNavigation'
import DesktopNavigation from './NavComponents/DesktopNavigation'
import UserMenu from './NavComponents/NavbarTooltip/UserMenu'
import LanguageSelect from './NavComponents/NavbarTooltip/LanguageSelect'
import UserButton from './NavComponents/NavbarTooltip/UserButton'

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const ctx = useContext(LanguageContext)

  const pages = [
    {
      pageName: ctx.language === 'en' ? 'Promotions' : 'Promocje',
      link: 'promotions'
    },
    {
      pageName: ctx.language === 'en' ? 'Tech' : 'Technologie',
      link: 'tech'
    },
    {
      pageName: ctx.language === 'en' ? 'Messages' : 'Wiadomości',
      link: 'messages'
    }
  ]

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
    <AppBar position="static" color="default" sx={{ marginBottom: 3 }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <MobileNavigation pages={pages} />
          <DesktopNavigation pages={pages} />

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
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Navbar
