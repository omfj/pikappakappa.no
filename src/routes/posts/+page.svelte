<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1 class="text-3xl mb-5">Innlegg</h1>

{#if data.canPost}
	<a href="/posts/new" class="text-lg bg-blue-600 text-white px-3 py-2 mx-auto rounded"
		>Nytt innlegg</a
	>
{/if}

{#if data.posts.length === 0}
	<p class="text-xl text-center">Finner ingen innlegg ☹️</p>
{/if}

{#each data.posts as post}
	<div class="flex flex-col gap-2 my-5 p-3 rounded-lg bg-gray-100">
		<h1 class="text-xl font-medium">{post.title}</h1>
		<p class="text-slate-700">{post.body.slice(0, 20)}</p>
		<a class="text-blue-600 hover:underline" href={`/posts/${post.id}`}>&rarr; Les mer</a>
	</div>
{/each}
