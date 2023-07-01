import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { createSession, validateUser } from '$lib/db/queries';
import { DEFAULT_SESSION_LENGTH } from '$lib/constants';
import { superValidate } from 'sveltekit-superforms/server';
import { loginSchema } from '$lib/validators/login';
import { isErrorWithMessage } from '$lib/utils/error';
import { dev } from '$app/environment';

export const load = (async ({ locals }) => {
	if (locals.user) {
		throw redirect(304, '/');
	}

	const form = await superValidate(loginSchema);

	return {
		form
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, loginSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const { username, password, remember } = form.data;

		const user = await validateUser(username, password);

		if (isErrorWithMessage(user)) {
			return fail(400, {
				form: { ...form, errors: { username: 'Ugyldig brukernavn eller passord' } }
			});
		}

		const session = await createSession(user.id, new Date(Date.now() + DEFAULT_SESSION_LENGTH));

		try {
			cookies.set('session', session.id, {
				secure: dev ? false : true,
				expires: remember ? session.expires : undefined
			});
		} catch (e) {
			console.log(e);
		}

		return {
			form
		};
	}
} satisfies Actions;
