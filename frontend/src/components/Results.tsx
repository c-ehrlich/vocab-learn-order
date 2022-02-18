import { Stack, Typography } from '@mui/material';
import useStore from '../store';
import WordCard from './WordCard';
import WordCardMini from './WordCardMini';

const Results = () => {
  const { serverResponse, setServerResponse } = useStore();

  return (
    <div>
      <button onClick={() => setServerResponse(null)}>back</button>
      <Typography variant='h5'>
        Words sorted by suggested Learn Order
      </Typography>
      <Stack spacing={2}>
        {serverResponse?.words.map((word) => (
          <WordCard word={word} />
        ))}
      </Stack>
      {serverResponse?.notFound && serverResponse?.notFound.length > 0 && (
        <>
          <Typography variant='h5'>Words not found in JMDict</Typography>
          <Stack spacing={2}>
            {serverResponse?.notFound.map((word) => (
              <WordCardMini word={word} />
            ))}
          </Stack>
        </>
      )}
    </div>
  );
};

export default Results;
