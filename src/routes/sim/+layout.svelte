<script lang="ts">
    import "../../app.css";
    import { page } from "$app/stores";
    const { children } = $props();

    const hrefs = [
        { path: "/sim/now", label: "1H" },
        { path: "/sim/hour", label: "1D" },
        { path: "/sim/day", label: "1M" },
        { path: "/sim/month", label: "6M" },
    ];
</script>

<section>
    <ul class="m-10 menu menu-horizontal bg-primary rounded-box">
        {#each hrefs as { path, label }}
            <li class="p-1">
                <a
                    href={path}
                    class:active={$page.url.pathname === path}
                    data-sveltekit-preload-data="tap">{label}</a
                >
            </li>
        {/each}
    </ul>
    <div class="flex justify-center mt-5 mb-60">
        {@render children()}
    </div>
</section>

<style lang="postcss">
</style>
