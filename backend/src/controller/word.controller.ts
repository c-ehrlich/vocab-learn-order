import { Request, Response } from 'express';
import { chunk } from 'lodash';
import { Word } from '../model/word.model';
import config from 'config';

import {
  createManyWords,
  deleteAllWords,
  findManyWords,
} from '../service/word.service';
import { logger } from '@typegoose/typegoose/lib/logSettings';
import sortWords from '../utils/sortWords';
import { TFrequencyListWeights, TSearchWordsInput, TWord } from '../schema/word.schema';
import findDuplicates from '../utils/findDuplicates';
import createCounts from '../utils/createCounts';

/**
 * We are assuming that input is sanitized in the frontend
 * So inputWords should be an array of strings
 */
export async function findWordsHandler(req: Request<{}, {}, TSearchWordsInput>, res: Response) {
  const inputWords: string[] = req.body.words;
  const weights: TFrequencyListWeights = req.body.weights;

  // TODO validate inputWords and inputWeights schema, send 400 if bad

  if (inputWords.length > 1000) {
    return res.json({
      error: 'Please submit under 1000 words',
    });
  }

  // create list of words that exist multiple times
  const duplicates = findDuplicates(inputWords);

  const response = await findManyWords(inputWords);

  const responseWithCounts = createCounts(response, duplicates);
  console.log(JSON.stringify(responseWithCounts[0]))
  
  const words: TWord[] = sortWords(responseWithCounts, weights);

  const notFound = findMissingWords(inputWords, words);

  return res.json({ words, notFound });
}

export async function fillDatabaseHandler(req: Request, res: Response) {
  const privateKeyCandidate = req.body.privateKey;
  const privateKey = config.get<string>('privateKey');
  if (privateKeyCandidate !== privateKey) {
    logger.info('Attempted request to /api/filldatabase');
    return res.json({ error: 'Route not accessible without private key' });
  }

  const words: TWord[] = require('../data/words-jmdict.json');

  // TODO this is mostly just a check to make sure we loaded the file successfully
  // but the number of words should probably not be hardcoded
  if (words.length !== 193785) return res.json({ error: "Incorrect data length" });

  const wordChunks = chunk(words, 1000);
  for (const chunk of wordChunks) {
    try {
      await createManyWords(chunk);
      logger.info('Put a chunk in the database');
    } catch (error: unknown) {
      return res.json({ error });
    }
  }

  return res.json({ message: "Database successfully populated" });
}

export async function deleteAllWordsHandler(req: Request, res: Response) {
  const privateKeyCandidate = req.body.privateKey;
  const privateKey = config.get<string>('privateKey');
  if (privateKeyCandidate !== privateKey) {
    logger.info('Attempted request to /api/deletedatabase');
    return res.json({ error: 'Route not accessible without private key' });
  }

  try {
    await deleteAllWords();
  } catch (error: unknown) {
    return res.json({ error });
  }

  return res.json({ message: 'Database deleted' });
}

function findMissingWords(inputWordList: string[], rankedWordResponse: Word[]) {
  const rankedWordResponseWords = rankedWordResponse.map((item) => item.word);

  const missingWords = inputWordList.filter((word) => {
    return !rankedWordResponseWords.includes(word);
  });

  return missingWords;
}
