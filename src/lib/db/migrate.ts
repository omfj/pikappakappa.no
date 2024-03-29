import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db } from './drizzle';

migrate(db, { migrationsFolder: './src/lib/db/migrations' })
	.then(() => {
		console.log('✅ Migrations complete!');
		process.exit(0);
	})
	.catch((err) => {
		console.error('❌ Migrations failed! Error:', err);
		process.exit(1);
	});
