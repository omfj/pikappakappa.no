import { db } from '$lib/db/drizzle';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const posts = await db.query.posts.findMany({
		orderBy: (post, { desc }) => desc(post.createdAt)
	});

	const canPost = locals.user?.type === 'ADMIN' || locals.user?.type === 'MEMBER';

	return {
		posts,
		canPost
	};
}) satisfies PageServerLoad;
