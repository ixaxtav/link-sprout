<script lang="ts">
    import { enhance } from '$app/forms';
    import { page } from '$app/stores';
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>




<h1 class="text-center mt-6 mb-2 font-bold text-xl">Edit your Profile</h1>
<p class="text-center">Current Bio: <span>{data.bio}</span></p>
<p class="text-red-500 text-center">{$page.form?.problem ?? ''}</p>

<main class="flex justify-center items-center w-full">
    <form method="POST" use:enhance>
        <br/>
        <label for="bio" class="font-bold" >
            Your bio
        </label>
        <br/>
        <textarea name="bio" id="bio" class="w-full textarea textarea-bordered" value={data.bio}></textarea>
        <br/>
        <button type="submit" class="btn btn-primary w-full mt-6">Update Bio</button>
    </form>
</main>