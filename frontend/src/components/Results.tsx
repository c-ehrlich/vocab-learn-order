import useStore from '../store';

const Results = () => {
  const { serverResponse, setServerResponse } = useStore();

  return (
    <div>
      <button onClick={() => setServerResponse(null)}>back</button>
      <div>{JSON.stringify(serverResponse)}</div>
    </div>
  );
};

export default Results;
