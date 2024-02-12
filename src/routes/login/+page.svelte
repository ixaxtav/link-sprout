<script lang="ts">
    import { auth, user } from '$lib/firebase';
    import { GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';

    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    } 

    async function signOut() {
        try {
            await firebaseSignOut(auth);
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

