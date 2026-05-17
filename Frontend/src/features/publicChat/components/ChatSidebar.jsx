"use client";

import { MessageCircle } from "lucide-react";

/**
 * ChatSidebar - Navigation component for switching between chat groups
 * Displays available chat groups and handles selection
 */
function ChatSidebar({ groups, selectedGroupId, onSelectGroup }) {
  return (
    <aside className="flex h-full min-h-[220px] w-full flex-col rounded-2xl border border-white/10 bg-slate-950/45 lg:min-h-[560px]">
      {/* Groups list */}
      <div className="flex-1 overflow-y-auto">
        <nav className="space-y-3 p-4">
          {groups.map((group) => {
            const isSelected = selectedGroupId === group.id;
            return (
              <button
                key={group.id}
                onClick={() => onSelectGroup(group.id)}
                className={`flex w-full items-start gap-3 rounded-xl px-4 py-3 text-left transition ${
                  isSelected
                    ? "border border-cyan-300/50 bg-cyan-400/15 text-cyan-100 shadow-[0_0_0_1px_rgba(34,211,238,0.15)]"
                    : "border border-white/10 text-slate-200 hover:bg-white/5"
                }`}
              >
                <span className="mt-0.5 text-xl">{group.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-base font-semibold tracking-tight text-white">
                    {group.label}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">
                    {group.description}
                  </p>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Info section */}
      <div className="border-t border-white/10 px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <MessageCircle size={18} />
          <p>Community Chat</p>
        </div>
      </div>
    </aside>
  );
}

export default ChatSidebar;
