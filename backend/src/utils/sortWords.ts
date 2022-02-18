import { IWord } from '../interfaces/IWord';
import { IWordSortingWeights } from '../interfaces/IWordSortingWeights';

function sortWords(words: IWord[], weights: IWordSortingWeights): IWord[] {
  return words.sort(compareWordForSorting);

  function compareWordForSorting(
    a: IWord,
    b: IWord,
  ): number {
    if (getWeightedWordRanking(a, weights) < getWeightedWordRanking(b, weights)) return 1;
    return -1;
  }

  function getWeightedWordRanking(word: IWord, weights: IWordSortingWeights): number {
    return (
      (word.animeJDrama ? weights.animeJDrama / word.animeJDrama : 0) +
      (word.bccwj ? weights.bccwj / word.bccwj : 0) +
      (word.innocent ? weights.innocent / word.innocent : 0) +
      (word.kokugojiten ? weights.kokugojiten / word.kokugojiten : 0) +
      (word.narou ? weights.narou / word.narou : 0) +
      (word.netflix ? weights.netflix / word.netflix : 0) +
      (word.novels ? weights.novels / word.novels : 0) +
      (word.vn ? weights.vn / word.vn : 0) +
      (word.wikipedia ? weights.wikipedia / word.wikipedia : 0)
    );
  }
}





export default sortWords;
