import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [mdsvex(), vitePreprocess()],

	extensions: ['.svelte', '.svx'],

	kit: {
		adapter: adapter()
	}
};

export default config;
