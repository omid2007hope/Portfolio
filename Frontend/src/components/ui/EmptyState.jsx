import Panel from "@/components/ui/Panel";

function EmptyState({ children, className = "" }) {
  return (
    <Panel className={`p-10 text-center text-white/70 ${className}`.trim()}>
      {children}
    </Panel>
  );
}

export default EmptyState;
