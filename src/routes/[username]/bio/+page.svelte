<script lang="ts">
    import { enhance } from '$app/forms';
    import { page } from '$app/stores';
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<h1>Edit Bio</h1>
<p>Current Bio: <span>{data.bio}</span></p>
<p>Status Code: {$page.status}</p>
<p>{$page.form?.problem ?? ''}

<main>
    <form method="POST" use:enhance>
        <div>
            <label for="bio">
                <span>Your bio</span>
            </label>
            <textarea name="bio" id="bio" value={data.bio}></textarea>
        </div>
        <button type="submit">Update Bio</button>
    </form>
</main>