import { app } from './app';

const PORT = 8000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening to port ... ${PORT}`);
});
