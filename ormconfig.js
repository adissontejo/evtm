module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB || 'evtm',
  synchronize: false,
  logging: false,
  entities: ['src/models/**/*.ts'],
  migrations: ['src/database/migrations/**/*.ts'],
  subscribers: ['src/database/subscribers/**/*.ts'],
  cli: {
    entitiesDir: 'src/models',
    migrationsDir: 'src/database/migrations',
    subscribersDir: 'src/database/subscribers',
  },
};
