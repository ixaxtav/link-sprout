<script lang="ts">
    export let icon = "default";
    export let url = "";
    export let title = "some cool title";
</script>

<a href={url} class="stack text-center bg-base-300 flex justify-center items-center p-4 rounded-lg not-prose no-underline">
    <img src={`/${icon}.png`} alt={icon} class="w-8 h-8"/>
    <span class="text-lg text-white font-bold">{title}</span>
</a>
