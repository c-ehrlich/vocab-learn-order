import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import Sliders from './Sliders';
import useStore from '../store';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const Header = () => {
  const [anchorElFrequency, setAnchorElFrequency] =
    React.useState<null | HTMLElement>(null);
  const { serverResponse, setServerResponse } = useStore();

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
              <IconButton aria-label='back' onClick={() => setServerResponse(null)}>
                <ArrowBackIosNewIcon fontSize='large' />
              </IconButton>
            ) : (
              <Tooltip title='Search settings'>
                <IconButton
                  color='inherit'
                  aria-label='settings'
                  onClick={handleOpenFrequencyMenu}
                >
                  <SettingsIcon fontSize='large' />
                </IconButton>
              </Tooltip>
            )}
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElFrequency}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElFrequency)}
              onClose={handleCloseFrequencyMenu}
            >
              <Sliders />
            </Menu>
          </Box>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: 'flex' }}
            justifyContent='center'
          >
            Word Learn Order
          </Typography>
          <HelpIcon fontSize='large' />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
