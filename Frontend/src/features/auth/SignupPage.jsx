"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { requestAuthCode, verifyAuthCode } from "@/api/chat/Chat_API";

const AUTH_TOKEN_KEY = "pp-chat-auth-token";
const AUTH_EMAIL_KEY = "pp-chat-auth-email";

const resolveNextPath = (value) => {
  if (!value || typeof value !== "string") {
    return "/public-chat";
  }

  if (!value.startsWith("/") || value.startsWith("//")) {
    return "/public-chat";
  }

  return value;
};

function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = useMemo(
    () => resolveNextPath(searchParams?.get("next") || ""),
    [searchParams],
  );

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const sendCode = async (event) => {
    event.preventDefault();

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    setSending(true);
    setError("");

    try {
      const response = await requestAuthCode(email.trim());
      setNotice(
        response?.code
          ? `Code sent: ${response.code} (dev mode)`
          : "A login code was sent to your email.",
      );

      if (typeof window !== "undefined") {
        window.localStorage.setItem(AUTH_EMAIL_KEY, email.trim());
      }
    } catch (requestError) {
      setError(requestError?.message || "Failed to send login code.");
    } finally {
      setSending(false);
    }
  };

  const completeSignup = async (event) => {
    event.preventDefault();

    if (!email.trim() || !code.trim()) {
      setError("Email and code are required.");
      return;
    }

    setVerifying(true);
    setError("");

    try {
      const response = await verifyAuthCode({
        email: email.trim(),
        code: code.trim(),
      });

      const token = response?.token || "";
      if (!token) {
        throw new Error("Token missing from verification response.");
      }

      if (typeof window !== "undefined") {
        window.localStorage.setItem(AUTH_TOKEN_KEY, token);
        window.localStorage.setItem(AUTH_EMAIL_KEY, email.trim());
      }

      router.push(nextPath);
    } catch (verifyError) {
      setError(verifyError?.message || "Failed to verify code.");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-950/50 p-6 md:p-8">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/80">
          Anonymous Access
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          Sign up to Comment and Chat
        </h1>
        <p className="max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
          One-time signup with email code, no password. Your public identity stays anonymous as Anonymous N.
        </p>
      </header>

      <form className="space-y-3" onSubmit={sendCode}>
        <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">
          Email
        </label>
        <div className="flex flex-col gap-2 md:flex-row">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="min-w-0 flex-1 rounded-xl border border-white/15 bg-slate-900/70 px-3 py-2.5 text-sm text-white placeholder:text-slate-400"
          />
          <button
            type="submit"
            disabled={sending}
            className="rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {sending ? "Sending..." : "Send code"}
          </button>
        </div>
      </form>

      <form className="space-y-3" onSubmit={completeSignup}>
        <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">
          Verification code
        </label>
        <div className="flex flex-col gap-2 md:flex-row">
          <input
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="6-digit code"
            className="min-w-0 flex-1 rounded-xl border border-white/15 bg-slate-900/70 px-3 py-2.5 text-sm text-white placeholder:text-slate-400"
          />
          <button
            type="submit"
            disabled={verifying}
            className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {verifying ? "Verifying..." : "Verify and continue"}
          </button>
        </div>
      </form>

      {notice ? <p className="text-sm text-cyan-100">{notice}</p> : null}
      {error ? <p className="text-sm text-rose-300">{error}</p> : null}
    </section>
  );
}

export default SignupPage;
