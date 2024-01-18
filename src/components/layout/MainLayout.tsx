import { Container } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="md">
        <Outlet />
      </Container>
    </>
  )
}

export default MainLayout
