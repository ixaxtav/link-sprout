<script lang="ts">
  import SortableList from "$lib/components/SortableList.svelte";
  import UserLink from "$lib/components/UserLink.svelte";
  import { db, user, userData } from "$lib/firebase";
  import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
  import { writable } from "svelte/store";

   const formDefaults = {
        icon: "custom",
        title: "",
        url: "https://"
    }

    const formData = writable(formDefaults);

    let showForm = false;

    $: urlIsValid = $formData.url.match(/^(ftp|http|https):\/\/[^ "]+$/);
    $: titleIsValid = $formData.title.length > 0 && $formData.title.length < 24;
    $: formIsValid = urlIsValid && titleIsValid;

    async function addLink(e: SubmitEvent){
      const userRef = doc(db, "users", $user!.uid);

      await updateDoc(userRef, {
        links: arrayUnion({
          ...$formData,
          id: Date.now().toString(),
        }),
      });

      formData.set({
        icon: "",
        title: "",
        url: "",
      })
    }

    function sortList(e: CustomEvent){
      const newList = e.detail;
      const userRef = doc(db, "users", $user!.uid);
      setDoc(userRef, {link: newList}, {merge:true})
    
    }
</script>

<SortableList list={$userData?.links} on:sort={sortList} let:item>
  <div class="group relative">
    <UserLink {...item} />
  </div>
</SortableList>

{#if showForm}
<form on:submit|preventDefault={addLink} class="">
    <select name="icon" class="select select-bordered w-32" bind:value={$formData.icon}>
        <!-- {#each icons as icon}
            <option value={icon.toLowerCase()}>{icon}</option>
        {/each} -->
    </select>
    <input type="text" name="title" class="input input-bordered w-64" placeholder="Title" bind:value={$formData.title} />
    <input type="text" name="url" class="input input-bordered w-64" placeholder="URL" bind:value={$formData.url} />
    <button type="submit" class="btn btn-primary" disabled={!formIsValid}>Add</button>
</form>
{/if}
