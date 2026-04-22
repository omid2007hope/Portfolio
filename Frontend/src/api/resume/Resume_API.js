import { fetchJson } from "@/api/client";

// GET /resume
export const getResume = async () => {
  try {
    return await fetchJson("/resume");
  } catch (_error) {
    return null;
  }
};
