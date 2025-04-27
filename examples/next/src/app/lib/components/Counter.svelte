<script lang="ts">
	let { count }: { count: number } = $props();

	$effect(() => {
		console.log("count", count);
	});
</script>

<div>
	<div>Svelte Counter Test: {count}</div>
	<button onclick={() => count++}>Increment</button>
</div>
