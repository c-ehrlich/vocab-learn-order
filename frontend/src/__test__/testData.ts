import { TServerResponse } from "../types/TServerResponse.type";

const testServerResponse: TServerResponse = {
  words: [
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
  ],
  notFound: ['foo'],
};

export { testServerResponse };