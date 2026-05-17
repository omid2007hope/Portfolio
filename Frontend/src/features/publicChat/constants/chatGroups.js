/**
 * Chat groups configuration
 * Defines available chat channels/scopes
 */
export const CHAT_GROUPS = [
  {
    id: "general",
    label: "General Chat",
    scope: "general_chat",
    description: "Casual conversations and general discussion",
    icon: "💬",
  },
  {
    id: "qanda",
    label: "Q&A",
    scope: "qanda",
    description: "Ask questions and share knowledge",
    icon: "❓",
  },
];

export const CHAT_GROUPS_MAP = CHAT_GROUPS.reduce((acc, group) => {
  acc[group.id] = group;
  return acc;
}, {});

export const getGroupById = (id) => CHAT_GROUPS_MAP[id] || CHAT_GROUPS[0];
