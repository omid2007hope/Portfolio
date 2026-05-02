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

  const normalizeData = () => {
    data.map((content) => {
      return {
        id: content.magazineId,
        title: content.title,
        description: content.description || "",
        date: content.date,
        image: content.photo || null,
      };
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h1 className="text-4xl font-bold mb-4">Magazine Page</h1>

      {tempTestData.title !== ""
        ? tempTestData.map((content) => {
            <div className="">{content.title}</div>;
          })
        : normalizeData.map((content) => {
            <div className="">{content.title}</div>;
          })}
    </div>
  );
}
``;
