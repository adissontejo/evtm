import 'reflect-metadata';

import app from './app';

app.listen(process.env.APP_PORT || 3333, () =>
  console.log('Server is running...')
);
