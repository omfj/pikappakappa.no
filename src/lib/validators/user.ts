import { z } from 'zod';

export const userSchema = z.object({
	id: z.string(),
	email: z.string().email(),
	username: z.string(),
	type: z.enum(['USER', 'MEMBER', 'ADMIN'])
});

export type User = z.infer<typeof userSchema>;

export const userEditSchema = z.object({
	email: z.string().email(),
	username: z.string(),
	firstName: z.string().optional().nullable(),
	lastName: z.string().optional().nullable()
});
export type UserEdit = z.infer<typeof userEditSchema>;
