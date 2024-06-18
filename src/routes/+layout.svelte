<script lang="ts">
    import "../app.css";

    const { children } = $props();
</script>

<main class="flex justify-center">
    {@render children()}
</main>

<style lang="postcss">
</style>
