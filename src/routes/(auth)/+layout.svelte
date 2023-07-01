<script lang="ts">
	import '../../app.css';
	import { user } from '$lib/stores/user';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: user.set(data.user);
</script>

<div class="flex items-center justify-center min-h-screen">
	<div class="sm:border sm:shadow-md sm:px-6 py-14 rounded-xl max-w-xl w-full mx-4">
		<slot />
	</div>
</div>
