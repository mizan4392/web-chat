/* eslint-disable @typescript-eslint/no-var-requires */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv').config();
export const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};

export const DB_URL = process.env.DATABASE_URL;
