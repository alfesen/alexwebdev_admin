import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import useAuth from '../../hooks/useAuth'
import { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { LanguageContext } from '../../context/LanguageProvider'
import { NativeSelect } from '@mui/material'
import MobileNavigation from './NavComponents/MobileNavigation'

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

  const changeLanguageHandler = (
    e: ChangeEvent<HTMLSelectElement> & { target: { value: 'en' | 'pl' } }
  ) => {
    ctx.setLanguage(e.target.value)
  }

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
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(({ pageName, link }) => (
              <Button
                key={pageName}
                component={Link}
                to={`/${link}`}
                sx={{ my: 2, color: '#555', display: 'block' }}
              >
                {pageName}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: 'flex', gap: 2 }}>
            <Tooltip title="Open settings">
              <>
                <NativeSelect
                  defaultValue={ctx.language}
                  onChange={changeLanguageHandler}
                >
                  <option value="en">En</option>
                  <option value="pl">Pl</option>
                </NativeSelect>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar />
                </IconButton>
              </>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={!!anchorElUser}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={logout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Navbar
