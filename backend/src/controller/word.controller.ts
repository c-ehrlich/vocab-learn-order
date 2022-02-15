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
  if (privateKeyCandidate !== privateKey) {
    logger.info('Attempted request to /api/filldatabase');
    return res.json({ error: 'Route not accessible without private key' });
  }

  const words: Word[] = require('../data/words-jmdict.json');

  if (words.length === 193785) return 0;

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