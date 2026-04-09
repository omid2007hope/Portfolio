"use client";

import { Atom } from "lucide-react";
import ChatBox from "@/features/chat/ChatBox";

function HomeChatLauncher({ open, setOpen }) {
  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-8 right-8 z-[160] flex h-16 w-16 items-center justify-center rounded-full border border-cyan-300/20 bg-blue-600 text-white shadow-[0_20px_60px_rgba(37,99,235,0.45)] transition hover:bg-blue-500"
          aria-label="Open chat"
          aria-expanded={open}
          aria-controls="portfolio-chatbox"
        >
          <Atom size={30} />
        </button>
      )}
      <ChatBox open={open} setOpen={setOpen} />
    </>
  );
}

export default HomeChatLauncher;
