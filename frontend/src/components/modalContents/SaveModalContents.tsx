import {
  Alert,
  Button,
  Grid,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';
import useStore from '../../store';
import { COLOR_LIGHT } from '../../themes/default';

const SaveModalContents = () => {
  const { serverResponse } = useStore();
  const [successSnackbarOpen, setSuccessSnackbarOpen] =
    useState<boolean>(false);
  const [failureSnackbarOpen, setFailureSnackbarOpen] =
    useState<boolean>(false);

  const createOutput = useMemo((): string => {
    if (serverResponse) {
      let words: string[] = [];
      serverResponse.words.forEach((word) => words.push(word.word));
      serverResponse.notFound.forEach((word) => words.push(word));
      return words.join(', ');
    }
    return '';
  }, [serverResponse]);

  const addToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    if ((await navigator.clipboard.readText()) === text) {
      temporarilyOpenSnackbar(setSuccessSnackbarOpen);
    } else {
      temporarilyOpenSnackbar(setFailureSnackbarOpen);
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
    <Stack spacing={2}>
      <Typography variant='h5'>Remaining words</Typography>
      <Typography
        variant='body1'
        lang='ja'
        fontFamily='Hiragino Kaku Pro, Meiryo'
      >
        {createOutput}
      </Typography>
      <Grid container justifyContent='center'>
        <Button
          onClick={() => addToClipboard(createOutput)}
          aria-label='Create Sample Input'
          variant='outlined'
          sx={{ marginY: 1, color: COLOR_LIGHT }}
        >
          Save to Clipboard
        </Button>
      </Grid>
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
    </Stack>
  );
};

export default SaveModalContents;
