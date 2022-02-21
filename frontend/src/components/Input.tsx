import { Alert, Button, Grid, Snackbar, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import useStore from '../store';
import { IServerResponse } from '../interfaces/IServerResponse';
import { defaultTheme } from '../themes/default';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

type Props = {};

const InputTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: defaultTheme.palette.secondary.dark,
  },
});

const Input = (props: Props) => {
  const navigate = useNavigate();
  const { setServerResponse, frequencyListWeights, textInput, setTextInput } =
    useStore();
  const [badResponseSnackbarOpen, setBadResponseSnackbarOpen] =
    useState<boolean>(false);
  const [snackbarText, setSnackbarText] = useState<string>('');

  const handleSearchButtonClick = async () => {
    // parse input
    let words: string[] = textInput
      .replace(/(\(|（)(.[^()（）]*)(\)|）)/gm, ' ') // remove anything inside () or （）
      .replace(/(\s|\n|,|、|・|·)+/gm, ' ') // remove delineation chars and consolidate whitespace
      .trim()
      .split(' '); // turn into aray

    // guard clause for no input
    if (words.length === 0) {
      setSnackbarText('Please input something');
      setBadResponseSnackbarOpen(true);
      return;
    }

    // make request
    const Response = await fetch(
      `${process.env.REACT_APP_SERVER}/api/learnorder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          words,
          weights: frequencyListWeights,
        }),
      }
    );
    
    const data: IServerResponse = await Response.json();
    if (data.words.length > 0) {
      setServerResponse(data);
      navigate('/results');
    } else {
      setSnackbarText('Bad input - check the help menu for sample input.');
      setBadResponseSnackbarOpen(true);
    }
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={badResponseSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setBadResponseSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setBadResponseSnackbarOpen(false)}
          severity='error'
          sx={{ width: '100%' }}
        >
          {snackbarText}
        </Alert>
      </Snackbar>
      <InputTextField
        lang='ja'
        id='outlined-multiline-static'
        label='Paste words here'
        multiline
        rows={16}
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        sx={{
          borderColor: '#ff0000',
          backgroundColor: '#ffffff',
          marginTop: 2,
        }}
        fullWidth
      />
      <Grid
        container
        direction='row'
        justifyContent='flex-start'
        alignItems='center'
        columnSpacing={2}
        rowSpacing={2}
        sx={{ marginTop: 0 }}
      >
        <Grid item xs={12} sm={6}>
          <Button
            fullWidth
            onClick={() => setTextInput('')}
            variant='outlined'
            startIcon={<ClearIcon />}
            size='large'
            sx={{
              '&:hover': {
                backgroundColor: defaultTheme.palette.primary.light,
              },
            }}
          >
            Clear
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            fullWidth
            onClick={handleSearchButtonClick}
            variant='contained'
            startIcon={<SearchIcon />}
            size='large'
            sx={{
              backgroundColor: defaultTheme.palette.primary.main,
            }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Input;
