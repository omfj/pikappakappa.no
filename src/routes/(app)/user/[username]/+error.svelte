<script>
	import { page } from '$app/stores';
</script>

<div class="my-10">
	<h1 class="text-center font-bold text-5xl mb-5">{$page.status}</h1>
	<p class="text-center text-xl">{$page.error?.message}</p>
</div>
