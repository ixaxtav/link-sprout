<script lang="ts">
  import { db, user } from "$lib/firebase";
  import { arrayRemove, doc, updateDoc, getDoc } from "firebase/firestore";


    export let icon = "default";
    export let url = "";
    export let title = "some cool title";
    export let id = "1234";

    async function deleteLink(linkId: string) { 
    const userRef = doc(db, "users", $user!.uid);

    const userSnapshot = await getDoc(userRef);
    if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        if (userData && userData.links) {
        const links = userData.links.filter((link: any) => link.id !== linkId);

        await updateDoc(userRef, {
            links: links,
        });
        }
        }
    }


</script>

<div class='flex items-center gap-4'>
    <a href={url} class="stack text-center bg-base-300 flex justify-center items-center p-4 rounded-lg not-prose w-full no-underline">
        <img src={`/${icon}.png`} alt={icon} class="w-8 h-8"/>
        <span class="text-lg text-white font-bold">{title}</span>
        <span>{id}</span>
    </a>
    <button class="btn btn-error" on:click={() => deleteLink(id)}>
        Delete
    </button>
</div>

