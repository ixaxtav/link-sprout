<script lang="ts">
    import { auth,  userData, user } from '$lib/firebase';
    import { signOut } from 'firebase/auth';
    import {page} from '$app/stores';
    import AuthCheck from '$lib/components/AuthCheck.svelte';


    async function signOutSSR() {
        try {
            const res = await fetch("/api/signin", {method: "DELETE"});
            await signOut(auth)
        } catch (error) {
            console.error(error);
        }
    }
</script>

<AuthCheck>
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </div>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52">
          <li><a class={`${$page.route.id === '/[username]' ? "active" : ""}`} href={`/${$userData?.username}`}>View Profile</a></li>
          <li><a class={`${$page.route.id?.includes("edit") ? "active" : ""}`} href={`/${$userData?.username}/edit`}>Edit Profile</a></li>
          <li><a class={`${$page.route.id?.includes("bio") ? "active" : ""}`} href={`/${$userData?.username}/bio`}>Edit Bio</a></li>
        </ul>
      </div>
      <a href="/" class="btn btn-ghost text-xl">🌱 Link Sprout</a>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><a class={`${$page.route.id === '/[username]' ? "active" : ""}`} href={`/${$userData?.username}`}>View Profile</a></li>
        <li><a class={`${$page.route.id?.includes("edit") ? "active" : ""}`} href={`/${$userData?.username}/edit`}>Edit Profile</a></li>
        <li><a class={`${$page.route.id?.includes("bio") ? "active" : ""}`} href={`/${$userData?.username}/bio`}>Edit Bio</a></li>
      </ul>
    </div>
    <div class="navbar-end">
      <a class="btn" href="/" on:click={signOutSSR}>Sign Out</a>
    </div>
  </div>

  <div class="min-h-screen flex flex-col">
      <slot/>
  </div>
</AuthCheck>
