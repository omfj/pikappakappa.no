import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { createSession, createUser } from '$lib/db/queries';
import { DEFAULT_SESSION_LENGTH } from '$lib/constants';
import { superValidate } from 'sveltekit-superforms/server';
import { registerSchema } from '$lib/validators/register';
import { isErrorWithMessage } from '$lib/utils/error';

export const load = (async ({ locals }) => {
	if (locals.user) {
		throw redirect(304, '/');
	}

	const form = await superValidate(registerSchema);

	return {
		form
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, registerSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const { username, email, password } = form.data;

		const userOrError = await createUser(email, username, password);

		if (isErrorWithMessage(userOrError)) {
			return fail(400, {
				form: { ...form, errors: { username: 'Username or email already taken' } }
			});
		}

		const userId = userOrError.insertedId;

		const session = await createSession(userId, new Date(Date.now() + DEFAULT_SESSION_LENGTH));

		cookies.set('session', session.id);

		return {
			form
		};
	}
} satisfies Actions;
