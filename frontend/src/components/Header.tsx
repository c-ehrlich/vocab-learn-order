import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import Sliders from './Sliders';
import useStore from '../store';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useState } from 'react';
import MaterialModal from './MaterialModal';

const Header = () => {
  const [anchorElFrequency, setAnchorElFrequency] =
    useState<null | HTMLElement>(null);
  const { serverResponse, setServerResponse } = useStore();

  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const handleHelpModalOpen = () => setHelpModalOpen(true);
  const handleHelpModalClose = () => setHelpModalOpen(false);

  const handleOpenFrequencyMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElFrequency(event.currentTarget);
  };

  const handleCloseFrequencyMenu = () => {
    setAnchorElFrequency(null);
  };

  return (
    <AppBar position='static'>
      <Container maxWidth='md' disableGutters>
        <Toolbar>
          <Box sx={{ flexGrow: 0 }}>
            {serverResponse ? (
              <IconButton
                aria-label='back'
                onClick={() => setServerResponse(null)}
              >
                <ArrowBackIosNewIcon fontSize='large' />
              </IconButton>
            ) : (
              <IconButton
                color='inherit'
                aria-label='settings'
                onClick={handleOpenFrequencyMenu}
              >
                <SettingsIcon fontSize='large' />
              </IconButton>
            )}
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElFrequency}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElFrequency)}
              onClose={handleCloseFrequencyMenu}
            >
              <Sliders />
            </Menu>
          </Box>
          <Typography
            fontSize='18pt'
            fontFamily="Roboto Serif"
            fontWeight='900'
            letterSpacing='0'
            sx={{ flexGrow: 1, display: 'flex', color: '#703d00' }}
            justifyContent='center'
          >
            Word Learn Order
          </Typography>
          <IconButton
            aria-label='help'
            color='inherit'
            onClick={handleHelpModalOpen}
          >
            <HelpIcon fontSize='large' sx={{ color: '#703d00' }} />
          </IconButton>
          <MaterialModal
            open={helpModalOpen}
            handleClose={handleHelpModalClose}
          >
            <Typography>Hello World</Typography>
          </MaterialModal>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
