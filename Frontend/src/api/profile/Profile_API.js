import { fetchJson } from "@/api/client";

// GET /profile
export const getProfile = async () => {
  try {
    return await fetchJson("/profile");
  } catch (_error) {
    return null;
  }
};
