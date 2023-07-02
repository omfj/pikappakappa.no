import { z } from 'zod';

export const commentSchema = z.object({
	parentId: z.string().optional().nullable(),
	body: z.string().min(1).max(1000)
});
