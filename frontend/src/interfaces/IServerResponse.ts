import { IWord } from "./IWord";

export interface IServerResponse {
  words: IWord[];
  notFound: string[];
}