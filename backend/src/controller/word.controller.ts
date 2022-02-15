import { Request, Response } from 'express';
import { chunk } from 'lodash';
import { Word } from '../model/word.model';
import config from 'config';

import {
  createManyWords,
  findManyWords,
} from '../service/word.service';

/**
 * We are assuming that input is sanitized in the frontend
 * So inputWords should be an array of strings
 */
export async function findWordsHandler(req: Request, res: Response) {
  const inputWords = req.body.words;
  
  if (inputWords.length > 1000) {
    return res.json({
      error: 'Please submit under 1000 words',
    });
  }

  const words = await findManyWords(inputWords);
  
  const notFound = findMissingWords(inputWords, words);
  
  return res.json({ words, notFound });
}

export async function fillDatabaseHandler(req: Request, res: Response) {
  const privateKeyCandidate = req.body.privateKey;
  const privateKey = config.get<string>('privateKey');

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

export async function deleteAllWordsHandler(req: Request, res: Response) {

}

function findMissingWords(
  inputWordList: string[],
  rankedWordResponse: Word[]
) {
  const rankedWordResponseWords = rankedWordResponse.map((item) => item.word);

  const missingWords = inputWordList.filter((word) => {
    return (!rankedWordResponseWords.includes(word));
  });

  return missingWords;
}
