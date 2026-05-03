import { useEffect, useState } from "react";
import { getAllContent } from "../../api/Magazine/Magazine_API";

export default function MagazinePage() {
  const [normalizedData, setNormalizedData] = useState(null);

  const data = getAllContent();

  useEffect(() => {
    const normalizedData = data.map((content) => {
      return {
        id: content.magazineId,
        title: content.title,
        description: content.description || "",
        date: content.date,
        image: content.photo || null,
      };
    });
    setNormalizedData(normalizedData);
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-full w-full">
        <h1 className="text-4xl font-bold mb-15">Daily Magazine</h1>
        <div className="w-full flex flex-col items-center justify-center gap-4 text-white text-lg border rounded-lg p-4">
          {normalizedData && normalizedData.length > 0 ? (
            normalizedData.map((items) => (
              <div
                key={items.id}
                className="flex flex-col items-center justify-center gap-4 text-white text-lg border rounded-lg p-4"
              >
                <img src={items.image} alt={items.title} />
                <p>{items.title}</p>
                <p>{items.description}</p>
                <p>{items.date}</p>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}
