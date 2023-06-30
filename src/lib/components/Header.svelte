<script lang="ts">
	import { enhance } from '$app/forms';
	import { user } from '$lib/stores/user';
	import clsx from 'clsx';
	import { navigating } from '$app/stores';

	$: isOpen = false;

	$: if ($navigating) isOpen = false;

	const toggle = () => {
		isOpen = !isOpen;
	};
</script>

<div
	class={clsx({
		'h-screen fixed top-0 left-0 w-full bg-white z-50': isOpen
	})}
>
	<header class="flex items-center p-4 justify-between mb-10">
		<h1 class="text-2xl font-semibold">
			<a href="/">Pi Kappa Kappa</a>
		</h1>

		<nav class="hidden md:block ml-5">
			<ul class="flex">
				<li>
					<a class="block px-3 py-1 rounded hover:bg-black/10" href="/posts">📖 Innlegg</a>
				</li>
				<li>
					<a class="block px-3 py-1 rounded hover:bg-black/10" href="/bylaws">📜 Vedtekter</a>
				</li>
				<li>
					<a class="block px-3 py-1 rounded hover:bg-black/10" href="/visit">🤙🏻 Besøk</a>
				</li>

				{#if $user}
					<li>
						<a class="block px-3 py-1 rounded hover:bg-black/10" href={`/user/${$user.username}`}
							>👤 Profil</a
						>
					</li>
					<li>
						<form action="/logout" method="POST" use:enhance>
							<button class="block px-3 py-1 rounded hover:bg-black/10" type="submit"
								>🚪 Logg ut</button
							>
						</form>
					</li>
				{:else}
					<li>
						<a class="block px-3 py-1 rounded hover:bg-black/10" href="/login">🔑 Logg inn</a>
					</li>
					<li>
						<a class="block px-3 py-1 rounded hover:bg-black/10" href="/register">🔨 Registrer</a>
					</li>
				{/if}
			</ul>
		</nav>

		<button on:click={toggle} class="block md:hidden">
			{#if isOpen}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6 rotate-45"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
				</svg>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
			{/if}
		</button>
	</header>

	{#if isOpen}
		<ul class="flex flex-col gap-5 text-xl p-5">
			<li>
				<a class="block px-3 py-1 rounded hover:bg-black/10" href="/posts">📖 Innlegg</a>
			</li>
			<li>
				<a class="block px-3 py-1 rounded hover:bg-black/10" href="/bylaws">📜 Vedtekter</a>
			</li>
			<li>
				<a class="block px-3 py-1 rounded hover:bg-black/10" href="/visit">🤙🏻 Besøk</a>
			</li>

			{#if $user}
				<li>
					<a class="block px-3 py-1 rounded hover:bg-black/10" href={`/user/${$user.username}`}
						>👤 Profil</a
					>
				</li>
				<li>
					<form class="w-full" action="/logout" method="POST" use:enhance>
						<button class="w-full text-left block px-3 py-1 rounded hover:bg-black/10" type="submit"
							>🚪 Logg ut</button
						>
					</form>
				</li>
			{:else}
				<li>
					<a class="block px-3 py-1 rounded hover:bg-black/10" href="/login">🔑 Logg inn</a>
				</li>
				<li>
					<a class="block px-3 py-1 rounded hover:bg-black/10" href="/register">🔨 Registrer</a>
				</li>
			{/if}
		</ul>
	{/if}
</div>
