import { fetchJson } from "@/api/client";

const normalizeMagazineList = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  return [];
};

export const getAllContent = async () => {
  try {
    const data = await fetchJson(`/magazine`);
    return normalizeMagazineList(data);
  } catch {
    return [];
  }
};

export const postMagazineContent = async (content) => {
  try {
    const data = await fetchJson(`/magazine`, {
      method: "POST",
      body: JSON.stringify(content),
    });
    return data;
  } catch (error) {
    console.error("Error posting magazine content:", error);
    return null;
  }
};
