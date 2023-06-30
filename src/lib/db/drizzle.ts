import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import * as schema from './schemas';

const pool = new Pool({
	connectionString: 'postgres://postgres:postgres@localhost:5432/db'
});

export const db = drizzle(pool, { schema });

// TODO: Move this in to a separate file (migrate.ts)?
await migrate(db, { migrationsFolder: './src/lib/db/migrations' });