import { z } from 'zod';

export const visitSchema = z.object({
	name: z.string().min(1),
	email: z.string().email(),
	visiting: z.string().array().min(1),
	reason: z.string().min(3).max(1000)
});
