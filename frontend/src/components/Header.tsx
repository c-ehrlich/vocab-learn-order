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
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Link } from '@mui/material';
import { sampleText } from '../utils/sampleText';
import { styled } from '@mui/material/styles';
import { COLOR_LIGHT, defaultTheme } from '../themes/default';

const LogoText = styled(Typography)({
  userSelect: 'none',
  WebkitTouchCallout: 'none',
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
});

const Header = () => {
  const navigate = useNavigate();

  const { setTextInput, serverResponse, setServerResponse } = useStore();

  const [anchorElFrequency, setAnchorElFrequency] =
    useState<null | HTMLElement>(null);
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  const handleHelpModalOpen = () => setHelpModalOpen(true);
  const handleHelpModalClose = () => setHelpModalOpen(false);

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

  const handlePopulateTextClick = () => {
    setTextInput(sampleText);
    handleHelpModalClose();
  };

  return (
    <AppBar
      position='static'
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
          <IconButton aria-label='help' onClick={handleHelpModalOpen}>
            <HelpIcon fontSize='large' />
          </IconButton>
          <MaterialModal
            open={helpModalOpen}
            handleClose={handleHelpModalClose}
          >
            <Typography>How to use:</Typography>
            <Box>
              <ul>
                <li>
                  Enter a list of Japanese words (just about any formatting
                  should be ok). If you just want to demo the app, click the
                  button below to get some sample input.
                </li>
                <li>
                  Adjust the Frequency List weightings if you want, by clicking
                  the settings button. Any changes you make will be stored on
                  your computer so they will still be there the next time you
                  visit this site.
                </li>
                <li>
                  Click <strong>Search</strong> to see your words, sorted by
                  optimal learn order. Use{' '}
                  <Link href='https://chrome.google.com/webstore/detail/yomichan/ogmnaimimemjmbakcfefmnahgdfhfami'>
                    Yomichan
                  </Link>{' '}
                  to create <Link href='https://apps.ankiweb.net/'>Anki</Link>{' '}
                  cards, and get sample sentences from YouGlish or ImmersionKit.
                </li>
              </ul>
            </Box>
            {serverResponse === null && (
              <Grid container justifyContent='center'>
                <Button
                  onClick={handlePopulateTextClick}
                  aria-label='Create Sample Input'
                  variant='outlined'
                  sx={{ marginY: 1, color: COLOR_LIGHT }}
                >
                  Create Sample Input
                </Button>
              </Grid>
            )}
            <Grid container justifyContent='center'>
              <Grid item xs={12}>
                <Typography align='center'>
                  <Link href='https://github.com/c-ehrlich/vocab-learn-order'>
                    view source code
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </MaterialModal>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
