import { classNames } from "@/utils/classNames";

function PageSection({
  children,
  className = "",
  contentClassName = "max-w-6xl",
}) {
  return (
    <section
      className={classNames(
        "flex min-h-[calc(100vh-5rem)] w-full justify-center px-6 py-8 text-white",
        className,
      )}
    >
      <div
        className={classNames(
          "flex w-full flex-col justify-center",
          contentClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}

export default PageSection;
