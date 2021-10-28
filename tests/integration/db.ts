import 'dotenv/config';

import {
  createConnection,
  getConnection,
  getConnectionOptions,
  MigrationExecutor,
} from 'typeorm';
import { createDatabase, dropDatabase } from 'typeorm-extension';

const init = async () => {
  const connectionOptions = await getConnectionOptions();

  await createDatabase(
    { ifNotExist: true },
    {
      ...connectionOptions,
      type: 'postgres',
      database: `${connectionOptions.database}_test`,
    }
  );

  const connection = await createConnection({
    ...connectionOptions,
    type: 'postgres',
    database: `${connectionOptions.database}_test`,
  });

  const migrations = new MigrationExecutor(connection);

  await migrations.executePendingMigrations();
};

const clear = async () => {
  const connection = getConnection();

  await connection.close();

  const connectionOptions = await getConnectionOptions();

  await dropDatabase(
    {
      ifExist: true,
    },
    {
      ...connectionOptions,
      type: 'postgres',
      database: `${connectionOptions.database}_test`,
    }
  );
};

const db = { init, clear };

export default db;
