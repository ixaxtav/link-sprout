<script lang="ts">
    import { user } from '$lib/firebase';
</script>

{#if $user}
    <slot />
{:else}
    <div class="flex flex-col items-center justify-center mt-4">
        <div class="card w-96 bg-neutral text-neutral-content">
            <div class="card-body items-center text-center">
              <h2 class="card-title">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-9a1 1 0 11-2 0V7a1 1 0 112 0v2zm-1 4a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                </svg>
              </h2>
              <p>User Not Authorized.</p>
              <div class="card-actions justify-end">
                <a href="/login" class="btn btn-primary">Log In</a>
              </div>
            </div>
          </div>
    </div>
{/if}