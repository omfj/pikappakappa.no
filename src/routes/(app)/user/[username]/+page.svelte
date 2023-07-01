<script lang="ts">
	import { user as userStore } from '$lib/stores/user';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	const { user, isUser } = data;
</script>

<svelte:head>
	<title>{user.username} | Pi Kappa Kappa</title>
</svelte:head>

<div class="sm:border sm:shadow-md sm:px-6 py-6 rounded-xl max-w-xl w-full mx-auto flex flex-col">
	<div>
		<h1 class="text-3xl font-medium">{user.username}</h1>
		{#if user.firstName || user.lastName}
			<p class="text-gray-500">{`${user.firstName} ${user.lastName}`.trim()}</p>
		{/if}
	</div>

	{#if isUser}
		<div class="flex gap-2 mt-5">
			<a
				href="/user/{user.username}/edit"
				class="p-2 rounded-xl border border-gray-600 text-gray-600 hover:bg-gray-200 font-medium"
				>Rediger profil</a
			>

			{#if $userStore?.type === 'ADMIN'}
				<a
					href="/admin"
					class="p-2 rounded-xl border border-gray-600 text-gray-600 hover:bg-gray-200 font-medium"
					>Dashboard</a
				>
			{/if}
		</div>
	{/if}

	{#if user.bio}
		<hr class="my-4" />
		<p>{user.bio}</p>
	{/if}
</div>
