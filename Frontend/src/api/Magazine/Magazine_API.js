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
  const data = await fetchJson(`/magazine`);
  return normalizeMagazineList(data);
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

export const postMagazineContentWithImage = async ({
  magazineId,
  title,
  description,
  date,
  image,
}) => {
  try {
    const formData = new FormData();
    formData.append("magazineId", String(magazineId));
    formData.append("title", title || "");
    formData.append("description", description || "");
    formData.append("date", date || "");

    if (image) {
      formData.append("image", image);
    }

    return await fetchJson(`/magazine`, {
      method: "POST",
      body: formData,
    });
  } catch (error) {
    console.error("Error posting magazine content with image:", error);
    return null;
  }
};
