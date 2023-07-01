<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Admin | Brukere</title>
</svelte:head>

<h1 class="text-3xl font-medium mb-5">Administrer brukere</h1>

{#if data.users.length === 0}
	<p class="text-gray-500">Ingen brukere funnet.</p>
{/if}

<div class="flex flex-col">
	{#each data.users as user}
		<div class="flex flex-row items-center justify-between bg-white rounded-lg shadow-md p-5 mb-5">
			<div class="flex flex-row items-center">
				<div class="flex flex-col">
					<h2 class="text-xl font-medium">{user.username}</h2>
					<p class="text-gray-500">{user.email}</p>
				</div>
			</div>
			<div class="flex flex-row items-center">
				<a href="/admin/users/{user.id}" class="text-blue-500 hover:text-blue-600">Rediger</a>
			</div>
		</div>
	{/each}
</div>
