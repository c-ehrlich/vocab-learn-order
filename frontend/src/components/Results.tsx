import useStore from "../store"

type Props = {}

const Results = (props: Props) => {
  const { serverResponse } = useStore();

  return (
    <div>{JSON.stringify(serverResponse)}</div>
    // if no server response: just a fragment
    // if serverResponse: the response, organized, plus a button to make another search
    // (which just sets the response to null)
  )
}

export default Results