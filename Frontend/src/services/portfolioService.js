import { getProfile, getProject, getProjects, getResume } from "@/lib/api";

export const getPortfolioProfile = () => getProfile();

export const getPortfolioProjects = (query = "") => getProjects(query);

export const getPortfolioProject = (identifier) => getProject(identifier);

export const getPortfolioResume = () => getResume();
