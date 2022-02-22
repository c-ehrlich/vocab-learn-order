import { TWord } from "./TWord.type";

export type TServerResponse = {
  words: TWord[];
  notFound: string[];
}