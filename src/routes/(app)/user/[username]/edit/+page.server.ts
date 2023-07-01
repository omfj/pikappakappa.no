import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { userEditSchema } from '$lib/validators/user';
import { db } from '$lib/db/drizzle';
import { users } from '$lib/db/schemas';
import { eq, or, and, ne } from 'drizzle-orm';

export const load = (async ({ parent }) => {
	const { user, isUser } = await parent();

	if (!isUser) {
		throw error(403, 'You are not authorized to edit this user.');
	}

	const form = await superValidate(user, userEditSchema);

	return {
		form,
		user
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ locals, params, request }) => {
		if (!locals.user || locals.user.username !== params.username) {
			throw error(403, "You are not authorized to edit this user's profile.");
		}

		const form = await superValidate(request, userEditSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const { email, username } = form.data;

		// Check if username or email already exists
		const existingUsers = await db
			.select()
			.from(users)
			.where(
				and(or(eq(users.username, username), eq(users.email, email)), ne(users.id, locals.user.id))
			);

		if (existingUsers.length > 0) {
			const usernameExists = existingUsers.some((user) => user.username === username);
			const emailExists = existingUsers.some((user) => user.email === email);

			if (usernameExists) {
				setError(form, 'username', 'Brukernavnet er allerede i bruk.');
			}

			if (emailExists) {
				setError(form, 'email', 'E-post er allerede i bruk.');
			}

			if (usernameExists || emailExists) {
				return fail(400, { form });
			}
		}

		await db.update(users).set(form.data).where(eq(users.id, locals.user.id));

		return {
			form
		};
	}
} satisfies Actions;
