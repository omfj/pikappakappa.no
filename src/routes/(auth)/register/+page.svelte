<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import clsx from 'clsx';

	export let data: PageData;

	const { form, constraints, errors, enhance } = superForm(data.form, {
		applyAction: false
	});
</script>

<svelte:head>
	<title>Register bruker</title>
</svelte:head>

<h1 class="text-3xl font-medium mb-5 text-center">Register bruker</h1>

<form class="flex flex-col gap-4" method="post" use:enhance>
	<div class="flex flex-col gap-2">
		<label for="username">Brukernavn</label>
		<input
			type="text"
			name="username"
			id="username"
			placeholder="Ditt kule brukernavn..."
			aria-invalid={$errors.username ? 'true' : undefined}
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
			autocomplete="email"
			placeholder="E-posten din..."
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
		<label for="password">Passord</label>
		<input
			type="password"
			name="password"
			id="password"
			autocomplete="new-password"
			placeholder="Ditt superhemmelige passord..."
			class={clsx('p-2 border bg-gray-200 rounded', {
				'border-red-500': $errors.password
			})}
			bind:value={$form.password}
			{...$constraints.password}
		/>
		{#if $errors.password}
			<p class="text-red-500">{$errors.password}</p>
		{/if}
	</div>

	<div class="flex flex-col gap-2">
		<label for="passwordConfirm">Bekreft passord</label>
		<input
			type="password"
			name="passwordConfirm"
			id="passwordConfirm"
			placeholder="Gjenta ditt superhemmelige passord..."
			class={clsx('p-2 border bg-gray-200 rounded', {
				'border-red-500': $errors.passwordConfirm
			})}
			bind:value={$form.passwordConfirm}
			{...$constraints.passwordConfirm}
		/>
		{#if $errors.passwordConfirm}
			<p class="text-red-500">{$errors.passwordConfirm}</p>
		{/if}
	</div>

	<button
		type="submit"
		class="bg-blue-600 text-white rounded-md p-2 hover:bg-blue-500 transition-all duration-150 active:scale-95"
		>Registrer deg</button
	>

	<p class="text-center text-gray-500">
		Har du allerde en konto?
		<a href="/login" class="underline hover:no-underline text-blue-600">Logg inn her</a>
	</p>

	<a href="/" class="text-center underline hover:no-underline text-blue-600">Til hovedsiden</a>
</form>
