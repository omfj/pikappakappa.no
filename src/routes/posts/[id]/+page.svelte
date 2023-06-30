<script lang="ts">
	import Markdown from '$lib/components/Markdown.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { title, body } = data;
</script>

<svelte:head>
	<title>Innlegg | {title}</title>
</svelte:head>

<h1 class="text-3xl mb-5 font-bold">{title}</h1>

<p>Skrevet av: {data.author}</p>

<Markdown content={body ?? 'Ingenting her'} />
