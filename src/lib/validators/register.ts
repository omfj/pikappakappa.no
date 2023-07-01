import { z } from 'zod';

export const registerSchema = z
	.object({
		username: z.string().min(3, 'Brukernavnet må være minst 3 tegn.'),
		email: z
			.string()
			.min(1, 'Du må oppgi en e-postadresse.')
			.email('Ikke en gyldig e-postadresse.'),
		password: z
			.string()
			.regex(
				new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'),
				'Passordet må inneholde minst 8 tegn, en stor bokstav, en liten bokstav og et tall.'
			),
		passwordConfirm: z.string().min(1, 'Du må bekrefte passordet.')
	})
	.superRefine(({ passwordConfirm, password }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'Passordene må være like.',
				path: ['passwordConfirm', 'password']
			});
		}
	});
