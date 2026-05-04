import MagazineCardGrid from "./component/MagazineCardGrid";
import MagazineEmptyState from "./component/MagazineEmptyState";
import MagazineSectionHeader from "./component/MagazineSectionHeader";
import MagazineSkeletonGrid from "./component/MagazineSkeletonGrid";
import useMagazineContent from "./hooks/useMagazineContent";

export default function MagazinePage() {
  const { items, isLoading, error, contentCountLabel } = useMagazineContent();

  return (
    <section className="space-y-8">
      <MagazineSectionHeader
        isLoading={isLoading}
        contentCountLabel={contentCountLabel}
      />

      {isLoading ? (
        <MagazineSkeletonGrid />
      ) : items.length > 0 ? (
        <MagazineCardGrid items={items} />
      ) : (
        <MagazineEmptyState error={error} />
      )}
    </section>
  );
}
