import { fetchJson } from "@/api/client";

// POST /contact
export const createContactSubmission = async (payload) =>
  fetchJson("/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
