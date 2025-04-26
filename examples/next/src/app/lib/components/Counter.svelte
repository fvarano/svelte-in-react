<script lang="ts">
  let { count }: { count: number } = $props();
</script>

<div>
  <div>Svelte Counter: {count}</div>
  <button onclick={() => count++}>Increment</button>
</div>
