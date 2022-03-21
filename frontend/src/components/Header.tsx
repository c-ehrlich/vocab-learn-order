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
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { useState } from 'react';
import MaterialModal from './MaterialModal';
import { useNavigate } from 'react-router-dom';
import { defaultTheme } from '../themes/default';
import SaveModalContents from './modalContents/SaveModalContents';
import styled from 'styled-components';
import HelpModalContents from './modalContents/HelpModalContents';

const Header = () => {
  const navigate = useNavigate();

  const { setTextInput, serverResponse, setServerResponse } = useStore();

  const [anchorElFrequency, setAnchorElFrequency] =
    useState<null | HTMLElement>(null);

  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const handleHelpModalOpen = () => setHelpModalOpen(true);
  const handleHelpModalClose = () => setHelpModalOpen(false);

  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const handleSaveModalOpen = () => setSaveModalOpen(true);
  const handleSaveModalClose = () => setSaveModalOpen(false);

  const handleOpenFrequencyMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElFrequency(event.currentTarget);
  };

  const handleCloseFrequencyMenu = () => {
    setAnchorElFrequency(null);
  };

  const handleBackButtonClick = () => {
    setServerResponse(null);
    setTextInput('');
    navigate('/', { replace: true });
  };

  return (
    <AppBar
      position='sticky'
      sx={{ backgroundColor: defaultTheme.palette.primary.dark }}
    >
      <Container maxWidth='md' disableGutters>
        <Toolbar>
          <Box sx={{ flexGrow: 0 }}>
            {serverResponse ? (
              <IconButton aria-label='back' onClick={handleBackButtonClick}>
                <ArrowBackIosNewIcon fontSize='large' />
              </IconButton>
            ) : (
              <IconButton
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
          <LogoText
            fontSize='28pt'
            fontFamily='EB Garamond'
            fontWeight='400'
            letterSpacing={-0.5}
            sx={{
              flexGrow: 1,
              display: 'flex',
              color: defaultTheme.palette.primary.main,
            }}
            justifyContent='center'
          >
            vocab learn order
          </LogoText>
          {serverResponse ? (
            <IconButton aria-label='save' onClick={handleSaveModalOpen}>
              <SaveAltIcon fontSize='large' />
            </IconButton>
          ) : (
            <IconButton aria-label='help' onClick={handleHelpModalOpen}>
              <HelpIcon fontSize='large' />
            </IconButton>
          )}
          <MaterialModal
            open={helpModalOpen}
            handleClose={handleHelpModalClose}
          >
            <HelpModalContents handleClose={handleHelpModalClose} />
          </MaterialModal>
          <MaterialModal
            open={saveModalOpen}
            handleClose={handleSaveModalClose}
          >
            <SaveModalContents />
          </MaterialModal>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const LogoText = styled(Typography)({
  userSelect: 'none',
  WebkitTouchCallout: 'none',
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
});

export default Header;
