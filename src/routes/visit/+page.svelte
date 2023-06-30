<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import clsx from 'clsx';

	export let data: PageData;

	export const createName = (user: (typeof data.members)[0]) => {
		if (user.firstName || user.lastName) {
			return `${user.firstName} ${user.lastName}`.trim();
		}

		return user.username;
	};

	const { form, constraints, errors, enhance } = superForm(data.form, {
		resetForm: true
	});
</script>

<h1 class="text-3xl font-medium mb-5">Meld besøk</h1>

<form class="space-y-4" method="post" use:enhance>
	<div class="flex flex-col gap-2">
		<label for="name">Navn</label>
		<input
			type="text"
			name="name"
			id="name"
			aria-invalid={$errors.name ? 'true' : undefined}
			placeholder="Ditt navn..."
			class={clsx('p-2 border bg-gray-200 rounded', {
				'border-red-500': $errors.name
			})}
			bind:value={$form.name}
			{...$constraints.name}
		/>
		{#if $errors.name}
			<p class="text-red-500">{$errors.name}</p>
		{/if}
	</div>

	<div class="flex flex-col gap-2">
		<label for="email">Epost</label>
		<input
			type="email"
			name="email"
			id="email"
			aria-invalid={$errors.email ? 'true' : undefined}
			placeholder="Din epost..."
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
		<label for="visiting">Hvem skal du besøke?</label>
		{#each data.members as member}
			<div>
				<input
					type="checkbox"
					id={member.id}
					name="visiting"
					bind:group={$form.visiting}
					value={member.id}
				/>
				<label for={member.id}>{createName(member)}</label>
			</div>
		{/each}
	</div>

	<div class="flex flex-col gap-2">
		<label for="reason">Hvorfor besøker du oss?</label>
		<textarea
			name="reason"
			id="reason"
			placeholder="Hva er formålet med besøket?"
			aria-invalid={$errors.reason ? 'true' : undefined}
			rows={5}
			class={clsx('p-2 border bg-gray-200 rounded', {
				'border-red-500': $errors.reason
			})}
			bind:value={$form.reason}
			{...$constraints.reason}
		/>
		{#if $errors.reason}
			<p class="text-red-500">{$errors.reason}</p>
		{/if}
	</div>

	<div>
		<button type="submit" class="bg-blue-600 text-white rounded-md p-2">Send inn</button>
	</div>
</form>
