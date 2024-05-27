import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'monorail.proxy.rlwy.net',
  port: 10195,
  username: 'postgres',
  password: 'WAluKLazmhqxLDEWeWerTktxOrEyawzP',
  database: 'railway',
  synchronize: false,
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*.ts'],
});
