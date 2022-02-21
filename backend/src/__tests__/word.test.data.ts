import { IWord } from "../interfaces/IWord";
import { IWordSortingWeights } from "../interfaces/IWordSortingWeights";

export const wordTestData: IWord[] = [
  {
    word: '学校',
    jmdict: ['school'],
    animeJDrama: 479,
    bccwj: 424,
    innocent: 690,
    kokugojiten: 860,
    narou: 1193,
    netflix: 457,
    novels: 419,
    vn: 485,
    wikipedia: 60,
    jlpt: [[5, 'N5']],
  },
  {
    word: '停留所',
    jmdict: ['stop (bus, tram, etc.)', 'station', 'stopping place'],
    animeJDrama: 38693,
    bccwj: 31415,
    innocent: 19440,
    kokugojiten: 30945,
    netflix: 31139,
    wikipedia: 2792,
    jlpt: [[3, 'N3']],
  },
];

export const requestTestWords: string[] = wordTestData.map(word => word.word);
export const requestTestWeights: IWordSortingWeights = {
  animeJDrama: 40,
  bccwj: 30,
  innocent: 30,
  kokugojiten: 10,
  narou: 30,
  netflix: 90,
  novels: 40,
  vn: 20,
  wikipedia: 30,
};
