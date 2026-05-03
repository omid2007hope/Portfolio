import { fetchJson } from "@/api/client";

export const getAllContent = async () => (await fetchJson(`/magazine`)) || [];
