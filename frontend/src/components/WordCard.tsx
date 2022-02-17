import { IWord } from '../interfaces/IWord'

type Props = {
  word: IWord
}

const WordCard = (props: Props) => {
  return (
    <div>{props.word.word}</div>
  )
}

export default WordCard