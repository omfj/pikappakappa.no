import { db } from '$lib/db/drizzle';
import { posts } from '$lib/db/schemas';
import { compile } from 'mdsvex';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	const { id } = params;

	const postsWithId = await db.query.posts.findMany({
		where: (post, { eq }) => eq(post.id, id),
		with: {
			user: true
		}
	});

	if (postsWithId.length === 0) {
		throw error(404, 'Post not found');
	}

	const post = postsWithId[0];

	const title = post.title;
	const author = () => {
		if (post.user.firstName || post.user.lastName) {
			return `${post.user.firstName} ${post.user.lastName}`.trim();
		}

		return post.user.username;
	};
	const body = await compile(post.body);

	return {
		title,
		author: author(),
		body: body?.code
	};
}) satisfies PageServerLoad;
