import { unstable_cache } from "next/cache";
import { fetchJson } from "@/lib/api";

const DEFAULT_REVALIDATE_SECONDS = 300;
const METADATA_REVALIDATE_SECONDS = 3600;

const getProfileCached = unstable_cache(
  async () => {
    try {
      return await fetchJson("/profile", {
        revalidate: DEFAULT_REVALIDATE_SECONDS,
      });
    } catch (_error) {
      return null;
    }
  },
  ["profile"],
  {
    revalidate: DEFAULT_REVALIDATE_SECONDS,
    tags: ["profile"],
  },
);

const getProjectsCached = unstable_cache(
  async (query = "") => {
    try {
      return (
        (await fetchJson(`/projects${query}`, {
          revalidate: DEFAULT_REVALIDATE_SECONDS,
        })) || []
      );
    } catch (_error) {
      return [];
    }
  },
  ["projects"],
  {
    revalidate: DEFAULT_REVALIDATE_SECONDS,
    tags: ["projects"],
  },
);

const getMetadataProfileCached = unstable_cache(
  async () => {
    try {
      return await fetchJson("/profile", {
        revalidate: METADATA_REVALIDATE_SECONDS,
      });
    } catch (_error) {
      return null;
    }
  },
  ["profile-metadata"],
  {
    revalidate: METADATA_REVALIDATE_SECONDS,
    tags: ["profile"],
  },
);

const getMetadataProjectsCached = unstable_cache(
  async () => {
    try {
      return (
        (await fetchJson("/projects", {
          revalidate: METADATA_REVALIDATE_SECONDS,
        })) || []
      );
    } catch (_error) {
      return [];
    }
  },
  ["projects-metadata"],
  {
    revalidate: METADATA_REVALIDATE_SECONDS,
    tags: ["projects"],
  },
);

const getProjectCached = unstable_cache(
  async (identifier) => {
    try {
      return await fetchJson(`/projects/${identifier}`, {
        revalidate: DEFAULT_REVALIDATE_SECONDS,
      });
    } catch (_error) {
      return null;
    }
  },
  ["project"],
  {
    revalidate: DEFAULT_REVALIDATE_SECONDS,
    tags: ["projects"],
  },
);

const getResumeCached = unstable_cache(
  async () => {
    try {
      return await fetchJson("/resume", {
        revalidate: DEFAULT_REVALIDATE_SECONDS,
      });
    } catch (_error) {
      return null;
    }
  },
  ["resume"],
  {
    revalidate: DEFAULT_REVALIDATE_SECONDS,
    tags: ["resume"],
  },
);

export const getProfile = () => getProfileCached();

export const getProjects = (query = "") => getProjectsCached(query);

export const getProject = (identifier) => getProjectCached(identifier);

export const getResume = () => getResumeCached();

export const getMetadataProfile = () => getMetadataProfileCached();

export const getMetadataProjects = () => getMetadataProjectsCached();
