import type { PageServerLoad } from "./$types";
import { adminAuth, adminDB } from "$lib/server/admin";}
import {error, fail} from "@sveltejs/kit"
import { collection } from 'firebase/firestore';

export const load = (async ({locals, params}) => {
  const uid = locals.userID;

  if(!uid){
    throw error(401, "You must be logged in to view this page!")
  }

  const userDoc = await adminDB.collection("users").doc(uid!).get();
  const { username, bio } = userDoc.data()!;

  if(params.username !== username){
    throw error(401, "That username does not belong to you!")
  }
  
  return {
    bio,
  }
}) satisfies PageServerLoad;

export const actions = {
  default: async({locals, request, params}) => {
    const uid = locals.userID;
    const data = await request.formData();
    const bio = data.get('bio')

    const userRef = adminDB.collections("users").doc(uid!);
    const {username} = (await userRef.get()).data()!;

    if(params.username !== username){
      throw error(401, "That username does not belong to you!")
    }

    if(bio!.length > 260){
      return fail(400, {problem: "Bio must be less than 260 characters!"})
    }

    await userRef.uopdate({
      bio,
    })
  }
} satisfies Actions;