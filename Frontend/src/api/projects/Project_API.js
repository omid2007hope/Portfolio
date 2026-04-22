import { fetchJson } from "@/api/client";

// GET /projects
export const getProjects = async (query = "") => {
  try {
    return (await fetchJson(`/projects${query}`)) || [];
  } catch (_error) {
    return [];
  }
};

// GET /projects/:identifier
export const getProjectById = async (identifier) => {
  try {
    return await fetchJson(`/projects/${identifier}`);
  } catch (_error) {
    return null;
  }
};
