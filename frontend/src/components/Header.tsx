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
import styled from 'styled-components';
import HelpModalContents from './modalContents/HelpModalContents';
import { Alert, Snackbar } from '@mui/material';

const Header = () => {
  const navigate = useNavigate();

  const { setTextInput, serverResponse, setServerResponse } = useStore();

  const [anchorElFrequency, setAnchorElFrequency] =
    useState<null | HTMLElement>(null);

  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const handleHelpModalOpen = () => setHelpModalOpen(true);
  const handleHelpModalClose = () => setHelpModalOpen(false);

  const [successSnackbarOpen, setSuccessSnackbarOpen] =
    useState<boolean>(false);
  const [failureSnackbarOpen, setFailureSnackbarOpen] =
    useState<boolean>(false);

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

  const saveRemainingWordsToClipboard = async (): Promise<void> => {
    if (serverResponse) {
      let words: string[] = [];
      serverResponse.words.forEach((word) => {
        const multiplier = word.multiplier || 1;
        for (let i = 0; i < multiplier; i++) {
          words.push(word.word)
        }
      });
      serverResponse.notFound.forEach((word) => words.push(word));
      const text = words.join(', ');
      await navigator.clipboard.writeText(text);
      if ((await navigator.clipboard.readText()) === text) {
        temporarilyOpenSnackbar(setSuccessSnackbarOpen);
      } else {
        temporarilyOpenSnackbar(setFailureSnackbarOpen);
      }
    }
  };

  const temporarilyOpenSnackbar = (
    openStateSetter: (value: React.SetStateAction<boolean>) => void
  ) => {
    openStateSetter(true);
    setTimeout(() => {
      openStateSetter(false);
    }, 3000);
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
            fontFamily='EB Garamond'
            fontWeight='400'
            letterSpacing={-0.5}
            sx={{
              flexGrow: 1,
              display: 'flex',
              color: defaultTheme.palette.primary.main,
            }}
            justifyContent='center'
            textAlign='center'
          >
            vocab learn order
          </LogoText>
          {serverResponse ? (
            <IconButton aria-label='save' onClick={async () => {saveRemainingWordsToClipboard()}}>
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
        </Toolbar>
      </Container>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={successSnackbarOpen}
        onClose={() => setSuccessSnackbarOpen(false)}
        sx={{ width: '100%' }}
      >
        <Alert severity='success'>Successfully copied to clipboard</Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={failureSnackbarOpen}
        onClose={() => setFailureSnackbarOpen(false)}
        sx={{ width: '100%' }}
      >
        <Alert severity='warning'>
          Could not copy to clipboard. Please copy manually
        </Alert>
      </Snackbar>
    </AppBar>
  );
};

const LogoText = styled(Typography)`
  /* userSelect: 'none',
  WebkitTouchCallout: 'none',
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none', */

  user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  font-size: 28pt;

  @media (max-width: 480px) {
    font-size: 18pt;
  }
  
`;

export default Header;
