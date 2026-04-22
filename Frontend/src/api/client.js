/**
 * Central API client.
 * All resource API modules import from here to make HTTP requests.
 * The underlying fetch logic (base URL, headers, error handling) lives in lib/api.js.
 */
export { fetchJson } from "@/lib/api";
