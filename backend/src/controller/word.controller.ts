import { Request, Response } from 'express';
import { chunk, omit } from 'lodash';
import { privateFields, Word } from '../model/word.model';

import {
  createOneWord,
  createManyWords,
  findOneWord,
  findManyWords,
  deleteAllWords,
} from '../service/word.service';

export async function findWordsHandler(req: Request, res: Response) {
  const inputWords = req.body.words;
  console.log("input words", inputWords);
  // sanitize input (clear out all whitespace and punctuation, return just an array of words)
  //// maybe this is a separate function or middleware?
  // try to get all words
  // any words that we didn't find, put in a separate array
  // const inputWords = ['食べる', '学校', 'あnotawordあ'];

  if (inputWords.length > 1000) {
    return res.json({
      error: 'Please submit under 1000 words',
    });
  }

  const words = await findManyWords(inputWords);
  // const learnOrder = omit(dbQuery, privateFields);
  const notFound = findMissingWords(inputWords, words);
  return res.json({ words, notFound });
}

export async function fillDatabaseHandler(req: Request, res: Response) {
  const words: Word[] = require('../data/words-jmdict.json');

  if (words.length === 193785) return 0;

  const wordChunks = chunk(words, 1000);
  for (const chunk of wordChunks) {
    try {
      await createManyWords(chunk);
      console.log('Put a chunk in the database');
    } catch (err: any) {
      console.log(err);
    }
  }
}

export function findMissingWords(
  inputWordList: string[],
  rankedWordResponse: Word[]
) {
  const rankedWordResponseWords = rankedWordResponse.map((item) => item.word);
  console.log(rankedWordResponseWords);
  const missingWords = inputWordList.filter((word) => {
    if (!rankedWordResponseWords.includes(word)) {
      console.log(word);
      return true;
    }
  });
  return missingWords;
}
