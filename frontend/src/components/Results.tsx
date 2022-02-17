import { Stack } from '@mui/material';
import useStore from '../store';
import WordCard from './WordCard';

const Results = () => {
  const { serverResponse, setServerResponse } = useStore();

  return (
    <div>
      <button onClick={() => setServerResponse(null)}>back</button>
      <Stack spacing={2}>
        {serverResponse?.words.map((word) => (
          <WordCard word={word} />
        ))}
      </Stack>
      <div>not found: {JSON.stringify(serverResponse?.notFound)}</div>
    </div>
  );
};

export default Results;
