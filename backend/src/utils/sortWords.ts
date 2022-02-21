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
      (word.animeJDrama ? weights.animeJDrama / Math.sqrt(word.animeJDrama) : 0) +
      (word.bccwj ? weights.bccwj / Math.sqrt(word.bccwj) : 0) +
      (word.innocent ? weights.innocent / Math.sqrt(word.innocent) : 0) +
      (word.kokugojiten ? weights.kokugojiten / Math.sqrt(word.kokugojiten) : 0) +
      (word.narou ? weights.narou / Math.sqrt(word.narou) : 0) +
      (word.netflix ? weights.netflix / Math.sqrt(word.netflix) : 0) +
      (word.novels ? weights.novels / Math.sqrt(word.novels) : 0) +
      (word.vn ? weights.vn / Math.sqrt(word.vn) : 0) +
      (word.wikipedia ? weights.wikipedia / Math.sqrt(word.wikipedia) : 0)
    );
  }
}





export default sortWords;
