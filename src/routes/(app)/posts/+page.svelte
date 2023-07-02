<script lang="ts">
	import { formatDate } from '$lib/utils/date';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Innlegg</title>
</svelte:head>

<h1 class="text-3xl mb-5">Innlegg</h1>

{#if data.canPost}
	<a
		href="/posts/new"
		class="text-lg bg-blue-600 mb-5 block max-w-xs w-full text-center text-white px-3 py-2 mx-auto rounded"
		>Nytt innlegg</a
	>
{/if}

{#if data.posts.length === 0}
	<p class="text-xl text-center">Finner ingen innlegg ☹️</p>
{/if}

<div class="divide-y">
	{#each data.posts as post}
		<div class="py-2">
			<a href={`/posts/${post.id}`} class="block hover:bg-gray-100 p-4 rounded-xl">
				<h1 class="text-xl font-medium">{post.title}</h1>
				<p class="text-sm text-gray-400">Publisert: {formatDate(post.createdAt)}</p>
			</a>
		</div>
	{/each}
</div>
