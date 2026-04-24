import { fetchJson } from "@/api/client";

// GET /projects
export const getProjects = async (query = "") =>
  (await fetchJson(`/projects${query}`)) || [];

// GET /projects/:identifier
export const getProjectById = async (identifier) =>
  fetchJson(`/projects/${identifier}`);
