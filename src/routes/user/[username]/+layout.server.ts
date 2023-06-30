import { getUserByUsername } from '$lib/db/queries';
import { isErrorWithMessage } from '$lib/utils/error';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
	const { username } = params;

	if (!username) {
		throw error(404, 'User not found');
	}

	const user = await getUserByUsername(username);

	if (isErrorWithMessage(user)) {
		throw error(404, 'User not found');
	}

	const isUser = locals.user?.id === user.id;

	return {
		user,
		isUser
	};
}) satisfies LayoutServerLoad;
