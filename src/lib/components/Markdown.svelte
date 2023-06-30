<script lang="ts">
	export let content: string;
</script>

<div class="markdown">
	{@html content}
</div>

<style>
	.markdown > :global(h1) {
		font-size: 2rem;
		font-weight: 600;
		margin-top: 2rem;
		margin-bottom: 1rem;
	}

	.markdown > :global(h2) {
		font-size: 1.5rem;
		font-weight: 600;
		margin-top: 2rem;
		margin-bottom: 1rem;
	}

	.markdown > :global(h3) {
		font-size: 1.25rem;
		font-weight: 600;
		margin-top: 2rem;
		margin-bottom: 1rem;
	}

	.markdown > :global(h4) {
		font-size: 1rem;
		font-weight: 600;
		margin-top: 2rem;
		margin-bottom: 1rem;
	}

	.markdown > :global(h5) {
		font-size: 0.875rem;
		font-weight: 600;
		margin-top: 2rem;
		margin-bottom: 1rem;
	}

	.markdown > :global(h6) {
		font-size: 0.85rem;
		font-weight: 600;
		margin-top: 2rem;
		margin-bottom: 1rem;
	}

	.markdown > :global(p) {
		font-size: 1rem;
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	.markdown > :global(ul) {
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	.markdown > :global(ol) {
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	.markdown > :global(li) {
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
		list-style-type: disc;
		margin-left: 1rem;
	}

	.markdown > :global(blockquote) {
		margin-top: 1rem;
		margin-bottom: 1rem;
		margin-left: 1rem;
		margin-right: 1rem;
	}

	.markdown > :global(table) {
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	.markdown > :global(thead) {
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	.markdown > :global(tbody) {
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	.markdown > :global(tr) {
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	.markdown > :global(th) {
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	.markdown > :global(td) {
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	.markdown > :global(strong) {
		font-weight: 600;
	}

	.markdown > :global(em) {
		font-style: italic;
	}

	.markdown > :global(del) {
		text-decoration: line-through;
	}

	.markdown > :global(a) {
		color: #0070f3;
		text-decoration: none;
	}

	.markdown > :global(a:hover) {
		text-decoration: underline;
	}

	.markdown > :global(img) {
		max-width: 100%;
		display: block;
	}
</style>
