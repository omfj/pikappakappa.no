import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const { user } = locals;

	if (!user) {
		return {
			user: undefined
		};
	}

	return {
		user: {
			id: user.id,
			username: user.username,
			email: user.email,
			type: user.type
		}
	};
}) satisfies LayoutServerLoad;
