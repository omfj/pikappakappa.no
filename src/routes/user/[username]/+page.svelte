<script lang="ts">
	import { user } from '$lib/stores/user';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<h1 class="text-3xl font-medium mb-5">{data.user.username}</h1>

<div class="flex flex-col gap-2 mb-5">
	<p class="text-xl">E-post: {data.user.email}</p>
	{#if data.user.firstName}
		<p class="text-xl">Fornavn: {data.user.firstName}</p>
	{/if}
	{#if data.user.lastName}
		<p class="text-xl">Etternavn: {data.user.lastName}</p>
	{/if}
</div>

<div class="flex divide-x items-center">
	{#if data.isUser}
		<a
			href="/user/{data.user.username}/edit"
			class="text-blue-500 hover:underline first:pl-0 px-2 last:pr-0">Rediger profil</a
		>
	{/if}

	{#if data.isUser && $user?.type === 'ADMIN'}
		<a href="/admin" class="text-blue-500 hover:underline first:pl-0 px-2 last:pr-0">Dashboard</a>
	{/if}
</div>
