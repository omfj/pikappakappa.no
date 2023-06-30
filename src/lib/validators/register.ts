import { z } from 'zod';

export const registerSchema = z
	.object({
		username: z.string(),
		email: z.string().email(),
		password: z
			.string()
			.regex(
				new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
				'Passordet må inneholde minst 8 tegn, en stor bokstav, en liten bokstav, et tall og et spesialtegn.'
			),
		passwordConfirm: z.string()
	})
	.superRefine(({ passwordConfirm, password }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'Passordene må være like.',
				path: ['passwordConfirm']
			});
		}
	});
