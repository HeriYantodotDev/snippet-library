import express from 'express';

import cookieSession from 'cookie-session';

import './controllers/index';

import { AppRouter } from './AppRouter';

const app = express();

const port = 5000;

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cookieSession({keys: ['asdfasdf']}));

app.use(AppRouter.router);

app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});