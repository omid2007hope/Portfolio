/* eslint-disable @next/next/no-img-element */
function ProjectDetailContent({ project }) {
  return (
    <div className="space-y-14 lg:col-span-2">
      <section>
        <h2 className="mb-4 text-2xl font-bold">Overview</h2>
        <p className="leading-relaxed text-white/80">
          {project.overview ||
            "This project was built to feel clear, fast, and ready for real users."}
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Problem, Approach, Outcome</h2>
        <p className="leading-relaxed text-white/80">
          {project.challengesAndSolutions ||
            "Challenge and solution notes have not been added yet."}
        </p>

        {!!project.showcaseImages?.length && (
          <div className="my-8 grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            {project.showcaseImages.map((image, index) => (
              <img
                key={`${image.url}-${index}`}
                src={image.url}
                alt={image.alt || `${project.title} showcase ${index + 1}`}
                width={400}
                height={256}
                className="h-64 w-full rounded-xl bg-slate-700 object-cover"
              />
            ))}
          </div>
        )}

        {project.highlightQuote ? (
          <div className="mt-6 rounded-xl border border-blue-600/30 bg-blue-700/20 p-6">
            <p className="font-semibold leading-relaxed text-blue-300">
              &ldquo;{project.highlightQuote}&rdquo;
            </p>
          </div>
        ) : null}

        <p className="mt-6 leading-relaxed text-white/80">
          {project.improvements ||
            "Additional improvements have not been added yet."}
        </p>
      </section>
    </div>
  );
}

export default ProjectDetailContent;
