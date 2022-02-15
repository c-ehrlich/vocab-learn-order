import express from 'express';
import { deleteAllWordsHandler, fillDatabaseHandler, findWordsHandler } from '../controller/word.controller';

const router = express.Router();

router.get('/healthcheck', (_, res) => res.status(200).send('Server is running :)'));

router.post('/api/learnorder', findWordsHandler);

// These routes require the private key to be send in the request body
// Nonetheless there is probably a better way to do this than having API routes ;-)
router.post('/api/filldatabase', fillDatabaseHandler);
router.delete('/api/deletedatabase', deleteAllWordsHandler);

export default router;