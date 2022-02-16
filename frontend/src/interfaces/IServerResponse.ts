export interface IServerResponse {
  words: {
    word: string;
    jmdict: string[];
    animeJDrama?: number;
    bccwj?: number;
    innocent?: number;
    kokugojiten?: number;
    narou?: number;
    netflix?: number;
    novels?: number;
    vn?: number;
    wikipedia?: number;
    jlpt?: [number, string][];
  }[];
  notFound: string[];
}