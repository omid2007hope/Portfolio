import Link from "next/link";

function About() {
  return (
    <div className="w-full h-334 bg-[#0f172a] text-white px-6 flex justify-center">
      <div className="w-full max-w-6xl md:mt-55 lg:mt-55">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold">About & Contact</h1>
          <p className="text-white/70 mt-2 text-lg">
            Learn more about me and how we can work together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="flex flex-col gap-6">
            <div className="border border-white/10 rounded-2xl p-6 bg-white/5">
              <p className="text-white/60 text-sm font-semibold uppercase tracking-wide">
                Location
              </p>
              <h1 className="text-xl font-semibold mt-2">Vienna, Austria</h1>
            </div>

            <div className="border border-white/10 rounded-2xl p-6 bg-white/5">
              <p className="text-white/60 text-sm font-semibold uppercase tracking-wide">
                Languages
              </p>
              <h1 className="text-xl font-semibold mt-2">English (Fluent)</h1>
            </div>

            <div className="border border-white/10 rounded-2xl p-6 bg-white/5">
              <p className="text-white/60 text-sm font-semibold uppercase tracking-wide">
                Email
              </p>
              <h1 className="text-xl font-semibold mt-2">
                omidhope2007@gmail.com
              </h1>
            </div>

            <div className="border border-green-600/30 bg-green-700/10 rounded-2xl p-6">
              <p className="text-green-200 text-sm font-semibold uppercase tracking-wide">
                Availability
              </p>
              <h1 className="text-xl font-semibold mt-2 text-green-100">
                Open to work and new projects
              </h1>
            </div>

            <Link
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition flex justify-center items-center text-center"
              href="/contact"
            >
              Get In Touch
            </Link>
          </div>

          <div className="lg:col-span-2 border border-white/10 rounded-2xl p-8 bg-white/5">
            <h2 className="text-2xl font-extrabold leading-snug">
              Crafting user-focused digital experiences.
            </h2>

            <p className="text-white/80 mt-5 leading-relaxed text-lg">
              As a passionate web developer, I specialize in building intuitive,
              responsive, and accessible web applications. My approach is rooted
              in clean code, modern UI design, and continuous learning. I focus
              on building products that are both visually sharp and technically
              solid.
            </p>

            <p className="text-white/80 mt-5 leading-relaxed text-lg">
              I enjoy solving complex problems and bringing ideas to life
              through thoughtful design and efficient development. The best
              digital experiences live at the intersection of simplicity, speed,
              and reliability.
            </p>

            <p className="text-white/80 mt-5 leading-relaxed text-lg">
              Let&apos;s build something exceptional together. I am open to
              work, collaborations, and freelance engagements.
            </p>
          </div>
        </div>

        <div className="mt-20 border-t border-white/10 pt-8 flex flex-col items-center space-y-4">
          <div className="flex gap-10 text-white/70">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <Link href="/projects" className="hover:text-white transition">
              Projects
            </Link>
            <Link href="/about" className="hover:text-white transition">
              About
            </Link>
          </div>

          <p className="text-white/40 text-sm">
            Ac 2024 Omid Teimory. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
