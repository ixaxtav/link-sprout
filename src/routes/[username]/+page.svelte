<script lang="ts">
    import UserLink from '$lib/components/UserLink.svelte';
    import type { PageData } from './$types';
    export let data: PageData;
    console.log(data)
</script>

<svelte:head>
    <title>@{data.username}</title>
    <meta name="description" content="Profile page for @{data.username}" />
</svelte:head>



<div class="mb-12 pb-12">
    <main class="text-center mx-auto mt-8 w-full md:w-4/6 ">
        <h1 class="text-3xl lg:text-3xl text-purple-500 mb-4">
            @{data.username}
        </h1>
        <img
            src={data.photoURL ?? `/user.png`}
            alt="photoURL"
            width="256"
            class="mx-auto"
        />
        <p class="text-xl my-8">
            {data.bio ?? "no bio yet..."}
        </p>
        <ul class="list-none px-2 m-0">
            {#each data.links as item}
                <li class="border-2 border-dashed border-transparent p-2 transition-all">
                    <UserLink {...item} />
                </li>
            {/each}
        </ul>
    
    </main>
</div>