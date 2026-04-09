function TagList({ items = [], className = "", itemClassName = "" }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`.trim()}>
      {items.map((item) => (
        <span
          key={item}
          className={`rounded-lg border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium ${itemClassName}`.trim()}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export default TagList;
