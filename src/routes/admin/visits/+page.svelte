<script lang="ts">
	import { listToReadable } from '$lib/list';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Admin | Besøk</title>
</svelte:head>

<h1 class="text-3xl font-medium mb-5">Administrer besøk</h1>

<ul>
	{#each data.visits as visit}
		<li>
			<div class="border p-4 my-2 rounded-lg">
				<h1 class="text-lg font-medium mb-3">{visit.name}</h1>
				<p>{visit.id}</p>
				<p>{visit.reason}</p>
				<p>{visit.email}</p>
				<p>{visit.createdAt}</p>

				<div class="my-3">
					{listToReadable(visit.visiting)}
				</div>
			</div>
		</li>
	{/each}
</ul>
