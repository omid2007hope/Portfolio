"use client";

import { useState, useCallback } from "react";
import {
  CHAT_GROUPS,
  getGroupById,
} from "@/features/publicChat/constants/chatGroups";

/**
 * useChatGroups - Manages chat group selection state
 * Handles switching between different chat channels (General, Q&A, etc.)
 */
export default function useChatGroups(defaultGroupId = "general") {
  const [selectedGroupId, setSelectedGroupId] = useState(defaultGroupId);

  const selectedGroup = getGroupById(selectedGroupId);

  const switchGroup = useCallback((groupId) => {
    const group = getGroupById(groupId);
    if (group) {
      setSelectedGroupId(groupId);
    }
  }, []);

  return {
    selectedGroupId,
    selectedGroup,
    switchGroup,
    availableGroups: CHAT_GROUPS,
  };
}
