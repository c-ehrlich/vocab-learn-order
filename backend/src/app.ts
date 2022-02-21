require('dotenv').config();
import config from 'config';
import connectToDb from './utils/connectToDb';
import log from './utils/logger';
import createServer from './utils/server';

const app = createServer();

const port = config.get('port') || 1337;

app.listen(port, () => {
  log.info(`App started on port ${port}`);
  connectToDb();
});
