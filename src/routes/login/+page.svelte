<script lang="ts">
    import { auth, user } from '$lib/firebase';
    import { credential } from 'firebase-admin';
    import { GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut, signOut } from 'firebase/auth';

    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
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

<h2>Login</h2>

{#if $user}
    <h2 class="card-title">Welcome, {$user.displayName}</h2>
    <p>You are logged in</p>
    <button class="btn btn-danger" on:click={signOut}>Sign out</button>
{:else}
    <button class="btn btn-primary" on:click={signInWithGoogle}>Sign in with Google</button>
{/if} 

