<script lang="ts">
    import AuthCheck from "$lib/components/AuthCheck.svelte";
    import { db, user, userData } from "$lib/firebase";
    import { doc, getDoc, writeBatch } from "firebase/firestore";

    let username = "";
    let loading = false;
    let isAvailable = false;
    let debounceTimer: NodeJS.Timeout;

    const re = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    $: isValid = username?.length > 2 && username.length < 16 && re.test(username);
    $: isTouched = username.length > 0;
    $: isTaken = isValid && !isAvailable && !loading;

    async function checkAvailability(){
        isAvailable = false;
        clearTimeout(debounceTimer);
        loading = true;

        debounceTimer = setTimeout(async () => {
            console.log("Checking username", username)
            const ref = doc(db, "usernames", username);
            const exists = await getDoc(ref).then((doc) => doc.exists());

            isAvailable = !exists;
            loading = false;
     
        }, 500);
 
    }

    async function confirmUsername(){
     
        const batch = writeBatch(db);
        batch.set(doc(db, "usernames", username), { uid: $user?.uid });
        batch.set(doc(db, "users", $user!.uid), {
            username,
            photoURL: $user?.photoURL ?? null,
            published: true,
            bio: "I am the Whale",
            links: [
                {
                    title: "Test Link",
                    url: "https://google.com",
                    icon: "custom",
                }
            ]
        });

        await batch.commit();

        username = "";
        isAvailable = false;
    }

</script>

<AuthCheck>
    {#if $userData?.username}
        <p class="text-lg">Your username is <span class="text-success font-bold">@{$userData.username}</span></p>
        <p class="text-sm">(Usernames cannot be changed)</p>
        <a class="btn btn-primary" href="/login/photo">Upload Profile Image</a>
    {:else}
        <form class="w-2/5" on:submit|preventDefault={confirmUsername}>
            <input type="text" placeholder="Username" class="input w-full mb-4" 
            bind:value={username} 
            on:input={checkAvailability}
            class:input-error={!isValid && isTouched}
            class:input-warning={isTaken}
            class:input-success={isAvailable && isValid && !loading}
            />
            {#if loading}
                <p class="text-sm text-lime-500">Checking...</p>
            {/if}

            {#if !isValid && isTouched}
                <p class="text-sm text-red-500">Username is taken</p>
            {/if}
            <button class="btn btn-success mt-6">Confirm username @{username}</button>
        </form>
    {/if}
</AuthCheck>
