import { Sequelize } from 'sequelize';

export const databaseEnabled = process.env.DB_ENABLED === 'true';
export const sequelize = new Sequelize(
  process.env.DB_NAME ?? 'aquaverse', process.env.DB_USER ?? 'root', process.env.DB_PASSWORD ?? '',
  { host: process.env.DB_HOST ?? '127.0.0.1', port: Number(process.env.DB_PORT ?? 3306), dialect: 'mysql', logging: false, pool: { max: 8, min: 0, acquire: 20000, idle: 10000 } },
);

export async function connectDatabase() {
  if (!databaseEnabled) { console.log('○ Database disabled — using in-memory stage 1 repository'); return; }
  await sequelize.authenticate(); await sequelize.sync(); console.log('✓ MySQL connected');
}
