import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'jeffrey',
  password: 'jeffrey_271097',
  database: 'blog',
  synchronize: false,
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*.ts'],
});
