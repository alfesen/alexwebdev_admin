import { Box, Modal as MuiModal } from '@mui/material'
import { ReactNode } from 'preact/compat'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
}

const Modal = ({ children, open, onClose }: { children: ReactNode; open: boolean, onClose: () => void }) => {
  return (
    <div>
      <MuiModal
        onClose={onClose}
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </MuiModal>
    </div>
  )
}

export default Modal
