import { Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store';
import WordCard from './WordCard';
import WordCardMini from './WordCardMini';

const Results = () => {
  const { serverResponse } = useStore();
  const navigate = useNavigate()

  useEffect(() => {
    if (serverResponse === null) {
      navigate('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Stack spacing={2} marginTop={2} marginBottom={4}>
      <Typography variant='h5'>
        Words sorted by suggested Learn Order
      </Typography>
      {serverResponse?.words.map((word) => (
        <WordCard key={word.word} word={word} />
      ))}
      {serverResponse?.notFound && serverResponse?.notFound.length > 0 && (
        <>
          <Typography variant='h5'>Words not found in Frequency Lists</Typography>
          {serverResponse?.notFound.map((word) => (
            <WordCardMini key={word} word={word} />
          ))}
        </>
      )}
    </Stack>
  );
};

export default Results;
