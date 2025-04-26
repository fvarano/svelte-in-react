<script lang="ts">
	let { initialCount = 0 }: { initialCount: number } = $props();
	let count = $state(initialCount);

	$effect(() => {
		count = initialCount;
	});
</script>

<div class="counter-container">
	<h3>Svelte Counter Component</h3>
	<div class="counter-value">Count: {count}</div>
	<button onclick={() => count++}>Increment in Svelte</button>
</div>

<style>
	.counter-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.counter-value {
		font-size: 1.2rem;
		font-weight: bold;
		margin: 0.5rem 0;
	}

	button {
		background-color: #ff3e00;
		color: white;
	}

	button:hover {
		background-color: #ff6340;
	}
</style>
