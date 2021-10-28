import { createConnection } from 'typeorm';

const init = async () => {
  const connection = await createConnection();
};

const clear = async () => {};

export { init, clear };
