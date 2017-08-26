import path from 'path';
import morgan from 'morgan';
import express from 'express';
import helmet from 'helmet';
import chalk from 'chalk';
import { config } from 'dotenv';

var pathToApp = __dirname;
const isDeveloping = process.env.NODE_ENV !== 'production';

const app = express();

config();

// Using helmet to secure Express with various HTTP headers
app.use(helmet());

// Use morgan for http request debug (only show error)
app.use(morgan('dev', { skip: (req, res) => res.statusCode < 400 }));
app.use(express.static(path.join(process.cwd(), './build/public')));

app.set('port', process.env.PORT);

app.listen(app.get('port'), (err) => {
  const url = `http://localhost:${app.get('port')}`;

  if (err) console.error(`==> 😭  OMG!!! ${err}`);

  console.info(chalk.green(`==> 🌎  Listening at ${url}`));

  // Open Chrome
  require('../tools/openBrowser')(url);
});
