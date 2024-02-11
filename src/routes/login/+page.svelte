<script lang="ts">
    import { auth } from '$lib/firebase';
    import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }
</script>

<h2>Login</h2>

<button class="btn btn-primary" on:click={signInWithGoogle}>Sign in with Google</button>