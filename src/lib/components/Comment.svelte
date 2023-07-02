<script lang="ts">
	import type { CommentTree } from '$lib/comments';
	import { formatDate } from '$lib/utils/date';
	import { capitalize } from '$lib/utils/string';

	export let comment: CommentTree;
	export let postId: string;

	let showComment = true;
	let reply = false;
</script>

<article class="my-4">
	<p>
		<span class="font-bold">{comment.user.username}</span> - {capitalize(
			formatDate(comment.createdAt)
		)}
		<button class="text-gray-400" on:click={() => (showComment = !showComment)}
			>{showComment ? '[-]' : '[+]'}</button
		>
	</p>

	{#if showComment}
		{@html comment.body}

		<div>
			<button class="text-blue-600" on:click={() => (reply = !reply)}
				>{reply ? 'Lukk' : 'Svar'}</button
			>
		</div>

		{#if reply}
			<form class="flex flex-col gap-2 max-w-md w-full" action={`/posts/${postId}`} method="post">
				<input type="hidden" name="parentId" value={comment.id} />
				<textarea class="p-2 rounded bg-gray-200" name="body" placeholder="Skriv en kommentar" />

				<div>
					<button class="p-2 rounded bg-blue-600 text-white" type="submit">Send inn</button>
				</div>
			</form>
		{/if}

		{#if comment.replies}
			<div class="ml-4 border-l px-2">
				{#each comment.replies as child}
					<svelte:self comment={child} {postId} />
				{/each}
			</div>
		{/if}
	{/if}
</article>
