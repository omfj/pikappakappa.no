<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let formData: ActionData;

	const { form, errors, enhance } = superForm(data.form, {
		resetForm: true
	});
</script>

{#if formData?.post}
	<p class="text-green-500">Innlegget ble laget!</p>
{/if}

<h1>Lag et innlegg</h1>

<form class="space-y-2" method="post" use:enhance>
	<div class="flex flex-col gap-2">
		<label for="title">Tittel</label>
		<input type="text" id="title" name="title" bind:value={$form.title} />
		{#if $errors.title}
			<p class="text-red-500">{$errors.title}</p>
		{/if}
	</div>

	<div class="flex flex-col gap-2">
		<label for="body">Innhold</label>
		<textarea id="body" name="body" bind:value={$form.body} />
		{#if $errors.body}
			<p class="text-red-500">{$errors.body}</p>
		{/if}
	</div>

	<div>
		<button type="submit" class="bg-blue-600 text-white px-3 py-2 rounded">Lag innlegg</button>
	</div>
</form>
