import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { createPostSchema } from '$lib/validators/post';
import { db } from '$lib/db/drizzle';
import { posts } from '$lib/db/schemas';

export const load = (async ({ locals }) => {
	const isMember = locals.user?.type === 'MEMBER' || locals.user?.type === 'ADMIN';
	if (!isMember) {
		throw redirect(301, '/');
	}

	const form = await superValidate(createPostSchema);

	return {
		form
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ locals, request }) => {
		const isMember = locals.user?.type === 'MEMBER' || locals.user?.type === 'ADMIN';
		if (!isMember) {
			return error(401, 'Unauthorized');
		}

		if (!locals.user?.id) {
			return error(500, 'User not found');
		}

		const form = await superValidate(request, createPostSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const { title, body } = form.data;

		const post = (
			await db
				.insert(posts)
				.values({
					title,
					body,
					userId: locals.user.id
				})
				.returning()
		)[0];

		return {
			form,
			post
		};
	}
} satisfies Actions;
