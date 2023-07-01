<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import clsx from 'clsx';
	import { user } from '$lib/stores/user';
	import toast from 'svelte-french-toast';

	export let data: PageData;

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

<h1 class="text-3xl font-medium mb-5">Logg inn</h1>

<form class="space-y-4" method="post" use:enhance>
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
		<label for="password">Passord</label>
		<input
			type="password"
			name="password"
			id="password"
			placeholder="Ditt hemmelige passord..."
			aria-invalid={$errors.password ? 'true' : undefined}
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

	<div>
		<input type="checkbox" name="remember" id="remember" bind:checked={$form.remember} />
		<label for="remember">Husk meg</label>
	</div>

	<div>
		<button type="submit" class="bg-blue-600 text-white rounded-md p-2">Logg inn</button>
	</div>
</form>
