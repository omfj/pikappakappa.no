import { eq, or } from 'drizzle-orm';
import { db } from './drizzle';
import { sessions, users } from './schemas';
import { hash } from '../utils/hash';

/**
 * Possible errors that can be returned from the database
 */
export const ERRORS = {
	USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
	USER_NOT_FOUND: 'USER_NOT_FOUND',
	EMAIL_OR_PASSWORD_INCORRECT: 'EMAIL_OR_PASSWORD_INCORRECT',
	SESSION_NOT_FOUND: 'SESSION_NOT_FOUND',
	SESSION_HAS_EXPIRED: 'SESSION_HAS_EXPIRED'
} as const;

/**
 * Creates a user in the database. Does not perform any validation.
 * @param email
 * @param username
 * @param password
 * @returns
 */
export const createUser = async (email: string, username: string, password: string) => {
	const usersWithEmailOrUsername = await db
		.select()
		.from(users)
		.where(or(eq(users.email, email), eq(users.username, username)));

	if (usersWithEmailOrUsername.length > 0) {
		return {
			message: ERRORS.USER_ALREADY_EXISTS
		};
	}

	const hashedPassword = hash(password);

	const user = await db
		.insert(users)
		.values({
			email,
			username,
			password: hashedPassword
		})
		.returning({
			insertedId: users.id
		});

	return user[0];
};

/**
 * Validates a user's credentials. Returns the user if valid, or an error message if invalid.
 * @param username
 * @param password
 * @returns
 */
export const validateUser = async (username: string, password: string) => {
	const user = (await db.select().from(users).where(eq(users.username, username)))[0];

	if (!user) {
		return {
			message: ERRORS.EMAIL_OR_PASSWORD_INCORRECT
		};
	}

	const hashedPassword = hash(password);

	if (user.password !== hashedPassword) {
		return {
			message: ERRORS.EMAIL_OR_PASSWORD_INCORRECT
		};
	}

	return user;
};

/**
 * Creates a session in the database
 * TODO: Does this fail if the user doesn't exist?
 * @param userId
 * @param expires
 * @returns
 */
export const createSession = async (userId: string, expires: Date) => {
	const session = await db
		.insert(sessions)
		.values({
			userId,
			expires
		})
		.returning();

	return session[0];
};

/**
 * Gets a user by their email
 * TODO: Limit what is returned
 * @param email
 * @returns
 */
export const getUserByEmail = async (email: string) => {
	const usersWithEmail = await db.select().from(users).where(eq(users.email, email));

	if (usersWithEmail.length === 0) {
		return {
			message: ERRORS.USER_NOT_FOUND
		};
	}

	const user = usersWithEmail[0];

	return user;
};

/**
 * Gets a user by their username
 * TODO: Limit what is returned
 * @param username
 * @returns
 */
export const getUserByUsername = async (username: string) => {
	const usersWithUsername = await db.select().from(users).where(eq(users.username, username));

	if (usersWithUsername.length === 0) {
		return {
			message: ERRORS.USER_NOT_FOUND
		};
	}

	const user = usersWithUsername[0];

	return user;
};

/**
 * Checks if a session is valid
 * @param sessionId
 * @returns
 */
export const isValidSession = async (sessionId: string) => {
	const sessionsWithId = await db.select().from(sessions).where(eq(sessions.id, sessionId));

	if (sessionsWithId.length === 0) {
		return false;
	}

	const session = sessionsWithId[0];

	// Check if the session has expired
	if (session.expires < new Date()) {
		return false;
	}

	return true;
};

/**
 * Gets a user by their session id
 * TODO: Limit what is returned
 * @param sessionId
 * @returns
 */
export const getUserBySessionId = async (sessionId: string) => {
	const sessionsWithId = await db.select().from(sessions).where(eq(sessions.id, sessionId));

	if (sessionsWithId.length === 0) {
		return {
			message: ERRORS.SESSION_NOT_FOUND
		};
	}

	const { userId, expires } = sessionsWithId[0];

	// Check if the session has expired
	if (expires < new Date()) {
		return {
			message: ERRORS.SESSION_HAS_EXPIRED
		};
	}

	const usersWithId = await db.select().from(users).where(eq(users.id, userId));

	if (usersWithId.length === 0) {
		return {
			message: ERRORS.USER_NOT_FOUND
		};
	}

	const user = usersWithId[0];

	return user;
};

/**
 * Deletes a session from the database
 * @param sessionId
 */
export const deleteSession = async (sessionId: string) => {
	await db.delete(sessions).where(eq(sessions.id, sessionId));
};
