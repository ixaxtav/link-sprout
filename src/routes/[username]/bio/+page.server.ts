import type { PageServerLoad } from "./$types";
import { adminDb } from "$lib/server/admin";
import { error, fail, type Actions } from "@sveltejs/kit";

export const load = (async ({ locals, params }) => {
  const uid = locals.userID;
  if (!uid) {
    throw error(401, "You must be logged in to view this page!");
  }

  const userDoc = await adminDb.collection("users").doc(uid).get();
  const { username, bio } = userDoc.data()!;

  if (params.username !== username) {
    throw error(401, "That username does not belong to you!");
  }

  return {
    bio,
  };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ locals, request, params }) => {
    const uid = locals.userID;
    const data = await request.formData();
    const bio = data.get("bio");

    if (typeof bio !== "string") {
      throw error(400, "Bio must be a string!");
    }

    const userRef = adminDb.collection("users").doc(uid!);
    const { username } = (await userRef.get()).data()!;

    if (params.username !== username) {
      throw error(401, "That username does not belong to you!");
    }

    if (bio.length > 260) {
      return fail(400, { problem: "Bio must be less than 260 characters!" });
    }

    await userRef.update({
      bio,
    });
  },
} satisfies Actions;
