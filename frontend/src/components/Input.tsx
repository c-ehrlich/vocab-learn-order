import { Fab, TextField } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

type Props = {};

const Input = (props: Props) => {
  const handleButtonClick = async () => {
    const root = process.env.REACT_APP_SERVER;
    const Response = await fetch(`${root}/api/learnorder`, {
      method: 'POST',
      // credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        words: ['食べる', '学校', 'レストラン', '舐達麻'],
      }),
    });
    const data = await Response.json();
    console.log(data);
  };

  return (
    <>
      <TextField
        id='outlined-multiline-static'
        label='Multiline'
        multiline
        rows={4}
        defaultValue='Default Value'
      />
      <Fab color='primary' aria-label='add' onClick={handleButtonClick}>
        <KeyboardArrowRightIcon />
      </Fab>
    </>
  );
};

export default Input;
