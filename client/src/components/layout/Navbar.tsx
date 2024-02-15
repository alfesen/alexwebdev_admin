import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import { useContext } from 'react'
import { LanguageContext } from '../../context/LanguageProvider'
import MobileNavigation from './NavComponents/MobileNavigation'
import DesktopNavigation from './NavComponents/DesktopNavigation'
import NavbarTooltip from './NavComponents/NavbarTooltip/NavbarTooltip'

const Navbar = () => {
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

  return (
    <AppBar position="static" color="default" sx={{ marginBottom: 3 }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <MobileNavigation pages={pages} />
          <DesktopNavigation pages={pages} />
          <NavbarTooltip />
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Navbar
