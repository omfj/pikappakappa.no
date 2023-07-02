<script lang="ts">
	import Markdown from '$lib/components/Markdown.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { invalidateAll } from '$app/navigation';
	import Comment from '$lib/components/Comment.svelte';

	export let data: PageData;
	$: ({ title, body, comments, postId } = data);

	const { form, errors, enhance } = superForm(data.form, {
		resetForm: true,
		onResult: async ({ result }) => {
			if (result.type === 'success') {
				await invalidateAll();
			}
		}
	});
</script>

<svelte:head>
	<title>Innlegg | {title}</title>
</svelte:head>

<article id="post">
	<h1 class="text-3xl mb-5 font-bold">{title}</h1>

	<p>Skrevet av: {data.author}</p>

	<Markdown content={body ?? 'Ingenting her'} />
</article>

<div id="comments">
	<h2 class="text-2xl mb-5 font-bold">Kommentarer</h2>

	<form class="flex flex-col gap-2 mb-3" method="post" use:enhance>
		<textarea
			class="bg-gray-200 p-2 rounded"
			name="body"
			placeholder="Skriv en kommentar"
			bind:value={$form.body}
		/>
		{#if $errors.body}
			<p class="text-red-500">{$errors.body}</p>
		{/if}
		<div>
			<button class="bg-blue-600 p-2 text-white rounded" type="submit">Send inn</button>
		</div>
	</form>

	{#if comments.length === 0}
		<p>Ingen kommentarer</p>
	{:else}
		{#each comments as comment}
			<Comment {comment} {postId} />
		{/each}
	{/if}
</div>
