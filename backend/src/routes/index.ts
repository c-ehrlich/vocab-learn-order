import express from 'express';

const router = express.Router();

router.get('/healthcheck', (_, res) => res.status(200).send('Server is running :)'));

export default router;