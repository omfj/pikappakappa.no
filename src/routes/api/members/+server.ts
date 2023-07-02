import { db } from '$lib/db/drizzle';
import { users } from '$lib/db/schemas';
import { eq, or } from 'drizzle-orm';

export const GET = async () => {
	const members = await db
		.select()
		.from(users)
		.where(or(eq(users.type, 'MEMBER'), eq(users.type, 'ADMIN')));

	const transformedMembers = members.map((member) => ({
		id: member.id,
		name: (() => {
			if (member.firstName || member.lastName) {
				return `${member.firstName} ${member.lastName}`.trim();
			}

			return member.username;
		})()
	}));

	return new Response(JSON.stringify(transformedMembers), {
		status: 200
	});
};
