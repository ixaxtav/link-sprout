<script lang="ts">
    import { auth, user } from '$lib/firebase';
    import { GoogleAuthProvider, signInWithPopup,  signOut } from 'firebase/auth';

    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        try {
            const credential = await signInWithPopup(auth, provider);
            const idToken = await credential.user.getIdToken();
            
            const res = await fetch("/api/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ idToken }),
            });

        } catch (error) {
            console.error(error);
        }
    } 

    async function signOutSSR() {
        try {
            const res = await fetch("/api/signin", {method: "DELETE"});
            await signOut(auth)
        } catch (error) {
            console.error(error);
        }
    }
</script>

<h2>Sign In</h2>

{#if $user}
    <h2 class="card-title">Welcome, {$user.displayName}</h2>
    <p class="text-success">You are currently logged in.</p>
    <div class="flex gap-4 mt-4">
        <button class="btn btn-outline btn-primary" on:click={signOutSSR}>Sign out</button>
        <a href="/login/username" class="btn btn-primary">Pick Username</a>
    </div> 
{:else}
    <button class="btn btn-primary" on:click={signInWithGoogle}>Sign in with Google</button>
{/if} 

