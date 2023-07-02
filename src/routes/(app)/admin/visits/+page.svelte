<script lang="ts">
	import { formatDate } from '$lib/utils/date';
	import { listToReadable } from '$lib/utils/list';
	import type { PageData } from './$types';
	import { capitalize } from '$lib/utils/string';

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
				<p class="text-gray-400 text-sm">{visit.id}</p>
				<h1 class="text-lg font-medium mb-3">Besøk fra: {visit.name}</h1>

				<p>{visit.reason}</p>

				<p>{visit.email}</p>

				<div class="my-3">
					{listToReadable(visit.visiting)}
				</div>

				<p>{capitalize(formatDate(visit.createdAt))}</p>
			</div>
		</li>
	{/each}
</ul>
