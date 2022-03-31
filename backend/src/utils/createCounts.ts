import { TWord } from "../schema/word.schema";
import { TDuplicateList } from "./findDuplicates";

export default function createCounts(words: TWord[], duplicates: TDuplicateList): TWord[] {
  const wordsWithMultiplier = words.map((word) => {
    const index = duplicates.findIndex((w) => w.word === word.word);
    if (index !== -1) {
      word.multiplier = duplicates[index].count;
      return word
    } else {
      word.multiplier = 1;
      return word;
    }
  });

  console.log(wordsWithMultiplier);

  return words;
}

