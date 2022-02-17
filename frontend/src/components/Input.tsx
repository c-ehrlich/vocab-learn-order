import { Fab, Grid, TextField } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import useStore from '../store';
import { IServerResponse } from '../interfaces/IServerResponse';
import { useState } from 'react';

type Props = {};

const Input = (props: Props) => {
  const [textInput, setTextInput] = useState<string>('');
  const { setServerResponse } = useStore();

  const handleButtonClick = async () => {
    // parse input
    let words: string[] = textInput
      .replace(/(\(|（)(.[^()（）]*)(\)|）)/gm, ' ') // remove anything inside () or （）
      .replace(/(\s|\n|,|、|・)+/gm, ' ') // remove delineation chars and consolidate whitespace
      .split(' '); // turn into aray

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
        }),
      }
    );
    const data: IServerResponse = await Response.json();
    if (data.words.length > 0) {
      setServerResponse(data);
    } else {
      // TODO show an error
      console.log('server sent back 0 results');
    }
  };

  return (
    <>
      <TextField
        id='outlined-multiline-static'
        label='Paste words here'
        multiline
        rows={16}
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        sx={{ backgroundColor: '#ffffff', marginTop: 2 }}
        fullWidth
      />
      <Fab color='primary' aria-label='add' onClick={handleButtonClick}>
        <KeyboardArrowRightIcon />
      </Fab>
    </>
  );
};

export default Input;
