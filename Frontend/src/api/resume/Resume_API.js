import { fetchJson } from "@/api/client";

// GET /resume
export const getResume = async () => fetchJson("/resume");
