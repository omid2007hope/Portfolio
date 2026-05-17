"use client";

import { MessageCircle } from "lucide-react";

/**
 * ChatSidebar - Navigation component for switching between chat groups
 * Displays available chat groups and handles selection
 */
function ChatSidebar({ groups, selectedGroupId, onSelectGroup }) {
  return (
    <aside className="w-full sm:w-3/10 h-full border-b border-white/10 sm:border-b-0 sm:border-r flex flex-col">
      {/* Groups list */}
      <div className="flex-1 overflow-y-auto">
        <nav className="p-3 space-y-2">
          {groups.map((group) => {
            const isSelected = selectedGroupId === group.id;
            return (
              <button
                key={group.id}
                onClick={() => onSelectGroup(group.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition flex items-center gap-2 ${
                  isSelected
                    ? "bg-cyan-400/20 border border-cyan-400/40 text-cyan-100"
                    : "border border-white/10 hover:bg-white/5 text-slate-300"
                }`}
              >
                <span className="text-lg">{group.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">
                    {group.label}
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    {group.description}
                  </p>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Info section */}
      <div className="border-t border-white/10 p-3">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <MessageCircle size={16} />
          <p>Community Chat</p>
        </div>
      </div>
    </aside>
  );
}

export default ChatSidebar;
