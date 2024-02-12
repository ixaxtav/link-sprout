<script lang="ts">
    import { user } from '$lib/firebase';
</script>

{#if $user}
    <slot />
{:else}
    <h1>Access denied</h1>
    <p>You must be logged in to view this page</p>
    <a href="/login">Log in</a>
{/if}