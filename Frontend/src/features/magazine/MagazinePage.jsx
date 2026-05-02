import { getAllContent } from "../../api/Magazine/Magazine_API";

export default function MagazinePage() {
  const tempTestData = [
    {
      id: 1,
      title: "test",
      description: "This is just for testing",
      date: "02-05-2026",
      image: null,
    },
  ];

  const data = getAllContent();

  const normalizeData = data.map((content) => {
    return {
      id: content.magazineId,
      title: content.title,
      description: content.description || "",
      date: content.date,
      image: content.photo || null,
    };
  });

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-full w-full">
        <h1 className="text-4xl font-bold mb-15">Daily Magazine</h1>
        <div className="w-full flex flex-col items-center justify-center gap-4 text-white text-lg border rounded-lg p-4">
          {normalizeData && normalizeData.length > 0 ? (
            normalizeData.map((items) => (
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
