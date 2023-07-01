import { z } from 'zod';

export const loginSchema = z.object({
	username: z.string(),
	password: z.string(),
	remember: z.boolean().default(false)
});
