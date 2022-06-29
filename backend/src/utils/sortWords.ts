import { TFrequencyListWeights, TWord } from '../schema/word.schema';

function sortWords(words: TWord[], weights: TFrequencyListWeights): TWord[] {
  return words.sort(compareWordForSorting);

  // TODO refactor so compareWordForSorting doesn't have to live inside sortWords?
  function compareWordForSorting(a: TWord, b: TWord): number {
    return getWeightedWordRanking(a, weights) <
      getWeightedWordRanking(b, weights)
      ? 1
      : -1;
  }
}

function getWeightedWordRanking(
  word: TWord,
  weights: TFrequencyListWeights
): number {
  const baseValue =
    frequencyListValueCalc(word.animeJDrama, weights.animeJDrama) +
    frequencyListValueCalc(word.bccwj, weights.bccwj) +
    frequencyListValueCalc(word.innocent, weights.innocent) +
    frequencyListValueCalc(word.kokugojiten, weights.kokugojiten) +
    frequencyListValueCalc(word.narou, weights.narou) +
    frequencyListValueCalc(word.netflix, weights.netflix) +
    frequencyListValueCalc(word.novels, weights.novels) +
    frequencyListValueCalc(word.vn, weights.vn) +
    frequencyListValueCalc(word.wikipedia, weights.wikipedia);

  return baseValue * (word.multiplier || 1);
}

function frequencyListValueCalc(
  flValue: number | undefined,
  flWeight: number
): number {
  if (!flValue) return 0;
  return Math.max(flWeight, 0) / flValue;
}

export default sortWords;
