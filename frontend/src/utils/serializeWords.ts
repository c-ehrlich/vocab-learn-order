import { TWord } from "../types/TWord.type";

export function serializeWords(wordList: TWord[], stringWords: string[] = []) {
  let words: string[] = [];
  wordList.forEach((word) => {
    const multiplier = word.multiplier || 1;
    for (let i = 0; i < multiplier; i++) {
      words.push(word.word);
    }
  });
  stringWords.forEach((word) => words.push(word));
  const text = words.join(', ');
  return text;
}
