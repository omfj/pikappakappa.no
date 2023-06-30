/// <reference types="@sveltejs/kit" />

import type { DrizzleUser } from '$lib/db/schemas';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: DrizzleUser | undefined;
		}
		// interface PageData {}
		// interface Platform {}
	}
}
