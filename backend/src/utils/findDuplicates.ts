export type TDuplicateList = {
  word: string;
  count: number;
}[];

export default function findDuplicates(words: string[]): TDuplicateList {
  let duplicates: TDuplicateList = [];

  // create list of how often each word exists
  words.forEach((word) => {
    const index = duplicates.findIndex((dword) => dword.word === word);
    if (index === -1) {
      duplicates.push({ word, count: 1 });
    } else {
      duplicates[index].count++;
    }
  });

  // delete all words that only exist once so the array is faster to search
  for (let i = duplicates.length - 1; i >= 0; i--) {
    if (duplicates[i].count === 1) {
      duplicates = ([] as TDuplicateList).concat(
        duplicates.slice(0, i),
        duplicates.slice(i + 1)
      );
    }
  }

  return duplicates;
}
