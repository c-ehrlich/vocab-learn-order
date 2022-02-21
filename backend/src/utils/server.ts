import express from 'express';
import cors from 'cors';
import config from 'config';
import helmet from 'helmet';
import router from '../routes';

function createServer() {
  const app = express();

  app.use(
    cors({
      origin: config.get('origin'),
    })
  );

  app.use(express.json());

  app.use(helmet());

  app.use(router);

  return app;
}

export default createServer;
