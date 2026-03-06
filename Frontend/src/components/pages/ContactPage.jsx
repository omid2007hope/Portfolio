"use client";

import { useMemo, useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import SiteFooter from "@/components/layout/SiteFooter";
import { createContactSubmission } from "@/lib/api";
import { getSocialIcon } from "@/lib/social-icons";

function Contact({ profile }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const socialLinks = useMemo(
    () =>
      profile?.socialLinks?.length
        ? profile.socialLinks
        : [
            {
              name: "GitHub",
              iconKey: "github",
              url: "https://github.com/omid2007hope",
            },
            {
              name: "LinkedIn",
              iconKey: "linkedin",
              url: "https://www.linkedin.com/in/omid-teimory-48233638b",
            },
            { name: "X", iconKey: "x", url: "https://x.com/Omid2007hope" },
          ],
    [profile],
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.subject || !form.message) {
      setStatus({ type: "error", message: "Please fill in all fields." });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      await createContactSubmission(form);
      setStatus({ type: "success", message: "Message sent successfully." });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus({
        type: "error",
        message: err.message || "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex min-h-[calc(100vh-5rem)] w-full justify-center px-6 py-8 text-white">
      <div className="flex w-full max-w-6xl flex-col justify-center">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold">Get in Touch</h1>
          <p className="mt-2 text-lg text-white/70">
            Have a question or want to work together? Fill out the form below and I&apos;ll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-2">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  autoComplete="name"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder-white/50"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder-white/50"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">Subject</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="What is this about?"
                autoComplete="off"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder-white/50"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                required
                className="h-40 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder-white/50"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold transition hover:bg-blue-700 disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            {status && (
              <p
                className={`text-sm font-semibold ${
                  status.type === "success" ? "text-green-400" : "text-red-400"
                }`}
              >
                {status.message}
              </p>
            )}
          </form>

          <div className="h-fit w-full space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-bold">Contact Information</h2>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-white/60">Email</p>
                <p className="font-semibold">{profile?.email || "omidhope2007@gmail.com"}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-white/60">Phone Number</p>
                <p className="font-semibold">{profile?.phoneNumber || "+43 681-81580180"}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-white/60">Address</p>
                <p className="font-semibold">{profile?.address || "Vienna, Austria"}</p>
              </div>
            </div>

            <hr className="border-white/10" />

            <div>
              <p className="mb-3 text-sm text-white/60">Find me on</p>

              <div className="flex gap-4">
                {socialLinks.map((item) => {
                  const Icon = getSocialIcon(item.iconKey);
                  return (
                    <a
                      key={`${item.name}-${item.url}`}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10"
                      aria-label={`${item.name} profile`}
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <SiteFooter profile={profile} />
      </div>
    </section>
  );
}

export default Contact;
