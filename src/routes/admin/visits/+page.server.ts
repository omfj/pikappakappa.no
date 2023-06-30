import { db } from '$lib/db/drizzle';
import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
	await parent();

	const visits = await db.query.visits.findMany({
		orderBy: (visit, { desc }) => desc(visit.createdAt),
		with: {
			visitsToUsers: {
				with: {
					user: true,
					visit: true
				}
			}
		}
	});

	const formattedVisits = visits.map((visit) => ({
		id: visit.id,
		name: visit.name,
		email: visit.email,
		reason: visit.reason,
		createdAt: visit.createdAt,
		visiting: visit.visitsToUsers.map((visit) => {
			if (visit.user.firstName || visit.user.lastName) {
				return `${visit.user.firstName} ${visit.user.lastName}`.trim();
			}

			return visit.user.username;
		})
	}));

	return {
		visits: formattedVisits
	};
}) satisfies PageServerLoad;
