import MenuIcon from '@mui/icons-material/Menu'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import {  useState } from 'react'
import { Link } from 'react-router-dom'

const MobileNavigation = ({ pages }: { pages: Record<string, string>[] }) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size="large"
        aria-label="current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="default"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        open={!!anchorElNav}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: 'block', md: 'none' }
        }}
      >
        {pages.map(({ pageName, link }) => (
          <MenuItem
            component={Link}
            to={`/${link}`}
            key={pageName}
            onClick={handleCloseNavMenu}
          >
            <Typography textAlign="center">{pageName}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default MobileNavigation
