import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-6 py-16 text-white">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-200/75">
          404
        </p>
        <h1 className="mt-4 text-4xl font-extrabold">
          The page you requested does not exist.
        </h1>
        <p className="mt-4 text-lg text-white/70">
          Return to the homepage or continue browsing project case studies.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Go Home
          </Link>
          <Link
            href="/projects"
            className="rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Browse Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
