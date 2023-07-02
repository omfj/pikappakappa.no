import { db } from '$lib/db/drizzle';
import { compile } from 'mdsvex';
import type { Actions, PageServerLoad } from './$types';
import { error, fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { commentSchema } from '$lib/validators/comment';
import { comments } from '$lib/db/schemas';
import { buildCommentTree, type Comment } from '$lib/comments';

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

	const commentsByPostId = (await db.query.comments.findMany({
		where: (comment, { eq }) => eq(comment.postId, id),
		with: {
			user: {
				columns: {
					username: true
				}
			}
		},
		columns: {
			id: true,
			commentId: true,
			body: true,
			createdAt: true
		}
	})) as unknown as Array<Comment>;

	const comments = buildCommentTree(commentsByPostId);

	const form = await superValidate(commentSchema);

	return {
		title,
		author: author(),
		body: body?.code,
		comments,
		postId: id,
		form
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ locals, request, params }) => {
		const { id } = params;
		const form = await superValidate(request, commentSchema);

		if (!locals.user) {
			return fail(401, {
				form: { ...form, errors: { body: 'Du må logge inn for å kommentere' } }
			});
		}

		if (!form.valid) {
			return fail(400, { form });
		}

		const { body, parentId } = form.data;

		await db.insert(comments).values({
			userId: locals.user.id,
			postId: id,
			commentId: parentId || null,
			body
		});

		return {
			form
		};
	}
} satisfies Actions;
