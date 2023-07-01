import type { Config } from 'drizzle-kit';

export default {
	out: './src/lib/db/migrations',
	schema: './src/lib/db/schemas.ts',
	breakpoints: false
} satisfies Config;
