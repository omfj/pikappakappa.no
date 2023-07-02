<script lang="ts">
	export let showModal: boolean; // boolean

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
	class="max-w-2xl w-full max-h-96 h-full rounded-lg shadow-md bg-white p-5"
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="flex flex-col min-h-full" on:click|stopPropagation>
		<header>
			<slot name="header" />
		</header>

		<hr class="my-2" />

		<div class="flex-1">
			<slot />
		</div>

		<div>
			<!-- svelte-ignore a11y-autofocus -->
			<button
				class="bg-blue-500 py-2 px-3 rounded text-white"
				autofocus
				on:click={() => dialog.close()}>Lukk</button
			>
		</div>
	</div>
</dialog>
