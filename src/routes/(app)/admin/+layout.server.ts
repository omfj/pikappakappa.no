import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const isAdmin = locals.user?.type === 'ADMIN';

	if (!isAdmin) {
		return error(403, 'Forbidden');
	}

	return {};
}) satisfies LayoutServerLoad;
