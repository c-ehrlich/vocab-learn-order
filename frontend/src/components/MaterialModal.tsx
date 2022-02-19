import { Backdrop, Box, Fade, Modal } from '@mui/material';
import React from 'react';

type Props = {
  children: React.ReactNode;
  open: boolean;
  handleClose: () => void;
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #703d00',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

const MaterialModal = (props: Props) => {
  return (
    <Modal
      aria-labelledby='modal'
      aria-describedby='modal dialog'
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
        <Box sx={style}>{props.children}</Box>
      </Fade>
    </Modal>
  );
};

export default MaterialModal;
