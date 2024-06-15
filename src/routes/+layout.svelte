<script lang="ts">
    import "../app.css";

    const { children } = $props();
</script>

<main class="h-screen flex justify-center items-center">
    {@render children()}
</main>

<style lang="postcss">
</style>
