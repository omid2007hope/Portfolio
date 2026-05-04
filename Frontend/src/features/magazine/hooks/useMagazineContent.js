import { useEffect, useMemo, useState } from "react";
import { getAllContent } from "@/api/Magazine/Magazine_API";

const toReadableDate = (value) => {
  if (!value) {
    return "";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return String(value);
  }

  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};

export default function useMagazineContent() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setIsLoading(true);
      setError("");

      try {
        const data = await getAllContent();

        if (!mounted) {
          return;
        }

        const list = Array.isArray(data) ? data : [];
        const normalized = list.map((content) => ({
          id:
            content.id ||
            String(content._id || "") ||
            String(content.magazineId || ""),
          magazineId: content.magazineId ?? null,
          title: content.title || "Untitled",
          description: content.description || "",
          date: content.date || "",
          displayDate: toReadableDate(content.date),
          photo: content.photo || null,
          createdAt: content.createdAt || null,
          updatedAt: content.updatedAt || null,
        }));

        setItems(normalized);
      } catch (err) {
        if (!mounted) {
          return;
        }

        setItems([]);
        setError(err?.message || "Unable to load magazine content right now.");
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  const contentCountLabel = useMemo(() => {
    const count = items.length;
    return `${count} ${count === 1 ? "entry" : "entries"}`;
  }, [items]);

  return {
    items,
    isLoading,
    error,
    contentCountLabel,
  };
}
