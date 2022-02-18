import { Stack, Typography } from '@mui/material';
import useStore from '../store';
import WordCard from './WordCard';
import WordCardMini from './WordCardMini';

const Results = () => {
  const { serverResponse } = useStore();

  return (
    <Stack spacing={2} marginTop={2} marginBottom={4}>
      <Typography variant='h5'>
        Words sorted by suggested Learn Order
      </Typography>
      {serverResponse?.words.map((word) => (
        <WordCard word={word} />
      ))}
      {serverResponse?.notFound && serverResponse?.notFound.length > 0 && (
        <>
          <Typography variant='h5'>Words not found in JMDict</Typography>
          {serverResponse?.notFound.map((word) => (
            <WordCardMini word={word} />
          ))}
        </>
      )}
    </Stack>
  );
};

export default Results;
