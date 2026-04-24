import { fetchJson } from "@/api/client";

// GET /profile
export const getProfile = async () => fetchJson("/profile");
