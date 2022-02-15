import express from 'express';
import { fillDatabaseHandler, findWordsHandler } from '../controller/word.controller';
import { chunk } from 'lodash';

const router = express.Router();

router.get('/healthcheck', (_, res) => res.status(200).send('Server is running :)'));

router.get('/api/learnorder', findWordsHandler);

// This route should only be active/called if you're trying to initialize a new database
// for the word/frequency list data
// There is probably a better way to do this than having a commented API route ;-)
// router.get('/api/filldatabase', fillDatabaseHandler);

export default router;