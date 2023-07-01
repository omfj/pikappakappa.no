<script lang="ts">
	import clsx from 'clsx';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { user } from '$lib/stores/user';

	export let data: PageData;

	const { form, constraints, errors, enhance, submitting } = superForm(data.form);
</script>

<h1 class="text-3xl font-medium mb-5">Rediger bruker</h1>

<form class="space-y-4" method="post" use:enhance>
	<div class="flex flex-col gap-2">
		<label for="username">Brukernavn</label>
		<input
			type="text"
			name="username"
			id="username"
			aria-invalid={$errors.username ? 'true' : undefined}
			placeholder="Your username..."
			class={clsx('p-2 border bg-gray-200 rounded', {
				'border-red-500': $errors.username
			})}
			bind:value={$form.username}
			{...$constraints.username}
		/>
		{#if $errors.username}
			<p class="text-red-500">{$errors.username}</p>
		{/if}
	</div>

	<div class="flex flex-col gap-2">
		<label for="email">E-post</label>
		<input
			type="email"
			name="email"
			id="email"
			aria-invalid={$errors.email ? 'true' : undefined}
			placeholder="Your email..."
			class={clsx('p-2 border bg-gray-200 rounded', {
				'border-red-500': $errors.email
			})}
			bind:value={$form.email}
			{...$constraints.email}
		/>
		{#if $errors.email}
			<p class="text-red-500">{$errors.email}</p>
		{/if}
	</div>

	<div class="flex flex-col gap-2">
		<label for="firstName">Fornavn</label>
		<input
			type="text"
			name="firstName"
			id="firstName"
			aria-invalid={$errors.firstName ? 'true' : undefined}
			placeholder="Your first name..."
			class={clsx('p-2 border bg-gray-200 rounded', {
				'border-red-500': $errors.firstName
			})}
			bind:value={$form.firstName}
			{...$constraints.firstName}
		/>
		{#if $errors.firstName}
			<p class="text-red-500">{$errors.firstName}</p>
		{/if}
	</div>

	<div class="flex flex-col gap-2">
		<label for="lastName">Etternavn</label>
		<input
			type="text"
			name="lastName"
			id="lastName"
			aria-invalid={$errors.lastName ? 'true' : undefined}
			placeholder="Your last name..."
			class={clsx('p-2 border bg-gray-200 rounded', {
				'border-red-500': $errors.lastName
			})}
			bind:value={$form.lastName}
			{...$constraints.lastName}
		/>
		{#if $errors.lastName}
			<p class="text-red-500">{$errors.lastName}</p>
		{/if}
	</div>

	<div class="flex flex-col gap-2">
		<label for="bio">Biografi</label>
		<textarea
			name="bio"
			id="bio"
			aria-invalid={$errors.bio ? 'true' : undefined}
			placeholder="Skriv litt om deg selv..."
			rows="4"
			class={clsx('p-2 border bg-gray-200 rounded', {
				'border-red-500': $errors.bio
			})}
			bind:value={$form.bio}
			{...$constraints.bio}
		/>
		<p>{$form.bio?.length ?? 0} / 300</p>
		{#if $errors.bio}
			<p class="text-red-500">{$errors.bio}</p>
		{/if}
	</div>

	<div>
		<button
			type="submit"
			disabled={$submitting ? true : false}
			class="p-2 bg-blue-600 text-white rounded disabled:opacity-70 disabled:cursor-progress"
		>
			{#if $submitting}
				Lagrer...
			{:else}
				Lagre
			{/if}
		</button>
		<a
			href={`/user/${$user?.username}`}
			class="inline-block p-2 bg-yellow-400 rounded disabled:opacity-70 disabled:cursor-progress"
		>
			Tilbake
		</a>
	</div>
</form>
