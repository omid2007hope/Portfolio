/**
 * Chat groups configuration
 * Defines available chat channels/scopes
 */
export const CHAT_GROUPS = [
  {
    id: "public",
    label: "# public",
    scope: "group",
    description: "Open public channel for everyone to read and discuss.",
    icon: "#",
  },
  {
    id: "qanda",
    label: "# q-a",
    scope: "qanda",
    description: "Questions and answers in a focused channel.",
    icon: "#",
  },
];

export const CHAT_GROUPS_MAP = CHAT_GROUPS.reduce((acc, group) => {
  acc[group.id] = group;
  return acc;
}, {});

export const getGroupById = (id) => CHAT_GROUPS_MAP[id] || CHAT_GROUPS[0];
