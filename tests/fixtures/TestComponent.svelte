<script>
  export let message = "Hello from Svelte";
  export let count = 0;
  
  function increment() {
    count += 1;
  }
</script>

<div data-testid="svelte-component">
  <h1>{message}</h1>
  <p data-testid="count-value">Count: {count}</p>
  <button data-testid="increment-button" on:click={increment}>Increment</button>
</div>
