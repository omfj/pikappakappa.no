<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import clsx from 'clsx';
	import { user } from '$lib/stores/user';
	import toast from 'svelte-french-toast';

	export let data: PageData;

	let isPasswordVisible = false;

	const togglePasswordVisibility = () => {
		isPasswordVisible = !isPasswordVisible;
	};

	const { form, constraints, errors, enhance } = superForm(data.form, {
		applyAction: false,
		taintedMessage: null,
		onResult: ({ result }) => {
			if (result.type === 'success' && !$user?.id) {
				toast.error('Innloggingen var vellykket, men det har skjedd en feil på vår side.');
			}
		}
	});
</script>

<svelte:head>
	<title>Logg inn</title>
</svelte:head>

<h1 class="text-3xl font-medium mb-5 text-center">Logg inn</h1>

<form class="flex flex-col gap-4" method="post" use:enhance>
	<div class="flex flex-col gap-2">
		<label for="username">Brukernavn</label>
		<input
			type="text"
			name="username"
			id="username"
			placeholder="Ditt kule brukernavn..."
			autocomplete="username"
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
		<label for="password">Passord</label>
		<div class="relative">
			{#if isPasswordVisible}
				<input
					name="password"
					id="password"
					type="text"
					placeholder="Ditt hemmelige passord..."
					aria-invalid={$errors.password ? 'true' : undefined}
					class={clsx('p-2 border bg-gray-200 rounded w-full', {
						'border-red-500': $errors.password
					})}
					bind:value={$form.password}
					{...$constraints.password}
				/>
			{:else}
				<input
					name="password"
					id="password"
					type="password"
					autocomplete="current-password"
					placeholder="Ditt hemmelige passord..."
					aria-invalid={$errors.password ? 'true' : undefined}
					class={clsx('p-2 border bg-gray-200 rounded w-full', {
						'border-red-500': $errors.password
					})}
					bind:value={$form.password}
					{...$constraints.password}
				/>
			{/if}
			<button
				type="button"
				class="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5"
				on:click={togglePasswordVisibility}
			>
				{#if isPasswordVisible}
					Skjul
				{:else}
					Vis
				{/if}
			</button>
		</div>

		{#if $errors.password}
			<p class="text-red-500">{$errors.password}</p>
		{/if}
	</div>

	<div>
		<input
			type="checkbox"
			name="remember"
			id="remember"
			class="cursor-pointer"
			bind:checked={$form.remember}
		/>
		<label for="remember">Husk meg</label>
	</div>

	<button type="submit" class="bg-blue-600 text-white rounded-md p-2">Logg inn</button>

	<p class="text-center text-gray-500">
		Har du ikke en bruker?
		<a href="/register" class="underline hover:no-underline text-blue-600">Registrer deg her</a>
	</p>

	<a href="/" class="text-center underline hover:no-underline text-blue-600">Til hovedsiden</a>
</form>
