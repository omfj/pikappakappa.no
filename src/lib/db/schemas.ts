import { relations, type InferModel } from 'drizzle-orm';
import {
	pgEnum,
	pgTable,
	primaryKey,
	text,
	timestamp,
	uniqueIndex,
	uuid,
	varchar
} from 'drizzle-orm/pg-core';

/**
 * ENUMS
 */
export const userType = pgEnum('user_type', ['ADMIN', 'MEMBER', 'USER']);

/**
 * USERS
 */
export const users = pgTable(
	'users',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		email: varchar('email', { length: 255 }).notNull(),
		username: varchar('username', { length: 255 }).notNull(),
		password: text('password').notNull(),
		firstName: varchar('first_name', { length: 255 }),
		lastName: varchar('last_name', { length: 255 }),
		type: userType('type').default('USER').notNull(),
		bio: varchar('bio', { length: 300 }),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at').defaultNow().notNull()
	},
	(users) => ({
		emailIndex: uniqueIndex('email_idx').on(users.email),
		usernameIndex: uniqueIndex('username_idx').on(users.username)
	})
);
export type DrizzleUser = InferModel<typeof users>;
export type DrizzleUserInsert = InferModel<typeof users, 'insert'>;

export const usersRelations = relations(users, ({ many }) => ({
	posts: many(posts),
	sessions: many(sessions),
	visitsToUsers: many(visitsToUsers)
}));

/**
 * SESSIONS
 */
export const sessions = pgTable('sessions', {
	id: uuid('id').defaultRandom().primaryKey(),
	userId: uuid('user_id')
		.notNull()
		.references(() => users.id),
	expires: timestamp('expires').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull()
});
export type DrizzleSession = InferModel<typeof sessions>;
export type DrizzleSessionInsert = InferModel<typeof sessions, 'insert'>;

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id]
	})
}));

/**
 * POSTS
 */
export const posts = pgTable('posts', {
	id: uuid('id').defaultRandom().primaryKey(),
	userId: uuid('user_id')
		.notNull()
		.references(() => users.id),
	title: varchar('title', { length: 255 }).notNull(),
	body: text('body').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
});
export type DrizzlePost = InferModel<typeof posts>;
export type DrizzlePostInsert = InferModel<typeof posts, 'insert'>;

export const postsRelations = relations(posts, ({ one }) => ({
	user: one(users, {
		fields: [posts.userId],
		references: [users.id]
	})
}));

/**
 * VISITS
 */
export const visits = pgTable('visits', {
	id: uuid('id').defaultRandom().primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	email: varchar('email', { length: 255 }).notNull(),
	reason: text('reason').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull()
});
export type DrizzleVisit = InferModel<typeof visits>;
export type DrizzleVisitInsert = InferModel<typeof visits, 'insert'>;

export const visitsRelations = relations(visits, ({ many }) => ({
	visitsToUsers: many(visitsToUsers)
}));

/**
 * VISITS TO USERS
 */
export const visitsToUsers = pgTable(
	'visits_to_users',
	{
		visitId: uuid('visit_id')
			.notNull()
			.references(() => visits.id),
		userId: uuid('user_id')
			.notNull()
			.references(() => users.id)
	},
	(visitMembers) => ({
		pk: primaryKey(visitMembers.userId, visitMembers.visitId)
	})
);
export type DrizzleVisitMember = InferModel<typeof visitsToUsers>;
export type DrizzleVisitMemberInsert = InferModel<typeof visitsToUsers, 'insert'>;

export const visitsToUsersRelations = relations(visitsToUsers, ({ one }) => ({
	visit: one(visits, {
		fields: [visitsToUsers.visitId],
		references: [visits.id]
	}),
	user: one(users, {
		fields: [visitsToUsers.userId],
		references: [users.id]
	})
}));
