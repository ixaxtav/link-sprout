<script lang="ts">
  import { page } from "$app/stores";
  import SortableList from "$lib/components/SortableList.svelte";
  import UserLink from "$lib/components/UserLink.svelte";
  import { db, user, userData } from "$lib/firebase";
  import { arrayRemove, arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
  import { writable } from "svelte/store";

  const formDefaults = {
        icon: "custom",
        title: "",
        url: "https://"
    }

    const icons = [
      "custom",
      "tiktok",
      "twitter",
      "youtube"
    ]

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

    console.log($userData?.links)
</script>


<h1 class="text-center mt-6 mb-2 font-bold text-xl">Edit your Profile</h1>
<p class="text-center">Profile Link: <a class="underline text-lime-400" href={$page.url.origin + "/" + $userData?.username}>
  {$page.url.origin + "/" + $userData?.username}
</a></p>

<main class="w-full md:w-4/6 mx-auto">
  <SortableList list={$userData?.links} on:sort={sortList} let:item>
    <div class="group relative">
      <UserLink {...item} />
    </div>
  </SortableList>
  {#if showForm}
  <form on:submit|preventDefault={addLink} class="mt-6">
      <select name="icon" class="select select-bordered w-32" bind:value={$formData.icon}>
          {#each icons as icon}
              <option value={icon.toLowerCase()}>{icon}</option>
          {/each}
      </select>
      <input type="text" name="title" class="input input-bordered w-64" placeholder="Enter title..." bind:value={$formData.title} />
      <input type="text" name="url" class="input input-bordered w-64" placeholder="Enter URL..." bind:value={$formData.url} />
      <button type="submit" class="btn btn-primary" disabled={!formIsValid}>Add</button>
    </form>
    {/if}
    <div class="text-center my-4">
      <button class="btn btn-primary" on:click={() => showForm = !showForm}>
        {#if showForm}
          Close
        {:else}
          Add Link
        {/if}
      </button>
    </div>
</main>

