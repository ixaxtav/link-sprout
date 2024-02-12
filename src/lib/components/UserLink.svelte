<script lang="ts">
    export let icon = "default";
    export let url = "";
    export let title = "some cool title";
</script>

<a href={url} class="">
    <img src={`/${icon}.png`} alt={icon} width="32" height="32"/>
    <span>{title}</span>
</a>