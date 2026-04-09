import { classNames } from "@/utils/classNames";

function Panel({ as: Component = "div", className = "", children }) {
  return (
    <Component
      className={classNames(
        "rounded-2xl border border-white/10 bg-white/5",
        className,
      )}
    >
      {children}
    </Component>
  );
}

export default Panel;
