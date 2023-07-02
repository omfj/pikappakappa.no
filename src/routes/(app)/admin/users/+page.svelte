<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import { formatDate } from '$lib/utils/date';
	import type { PageData } from './$types';

	export let data: PageData;

	let users = data.users.map((user) => ({
		...user,
		open: false
	}));
</script>

<svelte:head>
	<title>Admin | Brukere</title>
</svelte:head>

<h1 class="text-3xl font-medium mb-5">Administrer brukere</h1>

{#if data.users.length === 0}
	<p class="text-gray-500">Ingen brukere funnet.</p>
{/if}

<div class="flex flex-col">
	{#each users as user}
		<div class="flex flex-row items-center justify-between bg-white rounded-lg shadow-md p-5 mb-5">
			<div class="flex flex-row items-center">
				<div class="flex flex-col">
					<h2 class="text-xl font-medium">{user.username}</h2>
					<p class="text-gray-500">{user.email}</p>
				</div>
			</div>

			<div class="flex flex-row items-center">
				<button on:click={() => (user.open = true)} class="text-blue-500 hover:text-blue-600"
					>Rediger</button
				>
			</div>

			<Modal bind:showModal={user.open}>
				<h2 class="text-xl font-medium" slot="header">
					{user.id}
				</h2>

				<div class="flex flex-col">
					<p>Brukernavn: {user.username}</p>
					<p>E-post: {user.email}</p>
					<p>Fornavn: {user.firstName}</p>
					<p>Etternavn: {user.lastName}</p>
					<p>Type: {user.type}</p>
					<p>Laget: {formatDate(user.createdAt)}</p>
				</div>
			</Modal>
		</div>
	{/each}
</div>
