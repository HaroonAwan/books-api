import {DataSource, DataSourceOptions} from 'typeorm';
import dotenv from 'dotenv';
import {Book} from "../entity/book";

dotenv.config();

export function getConfig() {
  return {
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: +(process.env.POSTGRES_PORT ?? 5432),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: false,
    migrations: ['src/migration/*.{ts,js}'],
    entities: [Book],
  } as DataSourceOptions;
}

export class Postgres {
  static init() {
    return new DataSource(getConfig());
  }
}