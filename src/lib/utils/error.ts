// File is taken from: https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript

export type ErrorWithMessage = {
	message: string;
};

export const isErrorWithMessage = (error: unknown): error is ErrorWithMessage => {
	return (
		typeof error === 'object' &&
		error !== null &&
		'message' in error &&
		typeof (error as Record<string, unknown>).message === 'string'
	);
};
