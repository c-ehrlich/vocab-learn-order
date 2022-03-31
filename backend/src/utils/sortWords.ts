import { TFrequencyListWeights, TWord } from '../schema/word.schema';
import { TDuplicateList } from './findDuplicates';

function sortWords(words: TWord[], weights: TFrequencyListWeights): TWord[] {
  return words.sort(compareWordForSorting);

  function compareWordForSorting(a: TWord, b: TWord): number {
    if (getWeightedWordRanking(a, weights) < getWeightedWordRanking(b, weights))
      return 1;
    return -1;
  }

  function getWeightedWordRanking(
    word: TWord,
    weights: TFrequencyListWeights
  ): number {
    const baseValue =
      (word.animeJDrama
        ? Math.max(weights.animeJDrama, 0) / Math.sqrt(word.animeJDrama)
        : 0) +
      (word.bccwj ? Math.max(weights.bccwj, 0) / Math.sqrt(word.bccwj) : 0) +
      (word.innocent
        ? Math.max(weights.innocent, 0) / Math.sqrt(word.innocent)
        : 0) +
      (word.kokugojiten
        ? Math.max(weights.kokugojiten, 0) / Math.sqrt(word.kokugojiten)
        : 0) +
      (word.narou ? Math.max(weights.narou, 0) / Math.sqrt(word.narou) : 0) +
      (word.netflix
        ? Math.max(weights.netflix, 0) / Math.sqrt(word.netflix)
        : 0) +
      (word.novels ? Math.max(weights.novels, 0) / Math.sqrt(word.novels) : 0) +
      (word.vn ? Math.max(weights.vn, 0) / Math.sqrt(word.vn) : 0) +
      (word.wikipedia
        ? Math.max(weights.wikipedia, 0) / Math.sqrt(word.wikipedia)
        : 0);

    return baseValue * (word.multiplier || 1);
  }
}

export default sortWords;
