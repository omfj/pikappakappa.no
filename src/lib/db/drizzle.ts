import pg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import * as schema from './schemas';
import { DATABASE_URL } from '$env/static/private';

const { Pool } = pg;

const pool = new Pool({
	connectionString: DATABASE_URL
});

export const db = drizzle(pool, { schema });

// TODO: Move this in to a separate file (migrate.ts)?
await migrate(db, { migrationsFolder: './src/lib/db/migrations' });
