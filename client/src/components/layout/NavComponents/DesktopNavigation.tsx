import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

const DesktopNavigation = ({ pages }: { pages: Record<string, string>[] }) => {
  return (
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
  )
}

export default DesktopNavigation
