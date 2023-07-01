<script lang="ts">
	import '../../app.css';
	import Header from '$lib/components/Header.svelte';
	import { user } from '$lib/stores/user';
	import type { LayoutData } from '../$types';
	import Footer from '$lib/components/Footer.svelte';

	export let data: LayoutData;

	$: user.set(data.user);
</script>

<Header />

<main class="max-w-4xl mx-auto w-full px-4 flex-1">
	<slot />
</main>

<Footer />
