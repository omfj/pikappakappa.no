import { db } from '$lib/db/drizzle';
import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { visitSchema } from '$lib/validators/visit';
import { users, visits, visitsToUsers } from '$lib/db/schemas';
import { and, eq, inArray, or } from 'drizzle-orm';

export const prerender = true;

export const load = (async () => {
	const members = await db.query.users.findMany({
		where: (member, { eq, or }) => or(eq(member.type, 'MEMBER'), eq(member.type, 'ADMIN'))
	});

	if (members.length === 0) {
		throw error(404, 'No members found.');
	}

	const form = await superValidate(visitSchema);

	return {
		form,
		members
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, visitSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const { name, email, visiting, reason } = form.data;

		// Filter out any users that are not members or admins.
		// They should not be able to be visited.
		const members = await db
			.select()
			.from(users)
			.where(
				and(inArray(users.id, visiting), or(eq(users.type, 'MEMBER'), eq(users.type, 'ADMIN')))
			);

		const visitId = (
			await db
				.insert(visits)
				.values({
					name,
					email,
					reason
				})
				.returning({
					returningId: visits.id
				})
		)[0].returningId;

		await db.insert(visitsToUsers).values(
			members.map((member) => ({
				visitId,
				userId: member.id
			}))
		);

		return {
			form
		};
	}
} satisfies Actions;
