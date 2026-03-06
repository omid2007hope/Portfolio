"use client";

import Link from "next/link";
import { useState } from "react";
import { Github, Linkedin, X, Mail, MapPin } from "lucide-react";

import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_omid";
const TEMPLATE_ID = "template_omid";
const PUBLIC_KEY = "jM0uvw5dlLea-N5IA";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          user_name: form.name,
          user_email: form.email,
          user_subject: form.subject,
          user_message: form.message,
        },
        PUBLIC_KEY,
      );

      setStatus({ type: "success", message: "Message sent successfully." });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus({
        type: "error",
        message: "Failed to send message. Please try again.",
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
            Have a question or want to work together? Fill out the form below
            and I&apos;ll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  autoComplete="name"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none text-white placeholder-white/50"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none text-white placeholder-white/50"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="What is this about?"
                autoComplete="off"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none text-white placeholder-white/50"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                required
                className="w-full h-40 px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none text-white placeholder-white/50 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition text-lg disabled:opacity-60"
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

          <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 h-fit space-y-6">
            <h2 className="text-xl font-bold">Contact Information</h2>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Email</p>
                <p className="font-semibold">omidhope2007@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Phone Number</p>
                <p className="font-semibold">+43 681-81580180</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Address</p>
                <p className="font-semibold">EichenStrasse, Wien 1120</p>
              </div>
            </div>

            <hr className="border-white/10" />

            <div>
              <p className="text-white/60 text-sm mb-3">Find me on</p>

              <div className="flex gap-4">
                <a
                  href="https://github.com/omid2007hope"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition flex items-center justify-center"
                  aria-label="GitHub profile"
                >
                  <Github />
                </a>

                <a
                  href="https://www.linkedin.com/in/omid-teimory-48233638b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition flex items-center justify-center"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin />
                </a>

                <a
                  href="https://x.com/Omid2007hope"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition flex items-center justify-center"
                  aria-label="X profile"
                >
                  <X />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center space-y-4 border-t border-white/10 pt-8">
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
            <Link href="/contact" className="hover:text-white transition">
              Contact
            </Link>
          </div>

          <div className="flex gap-6 pt-4">
            <a
              href="https://github.com/omid2007hope"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 transition"
              aria-label="GitHub profile"
            >
              <Github />
            </a>

            <a
              href="https://www.linkedin.com/in/omid-teimory-48233638b"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 transition"
              aria-label="LinkedIn profile"
            >
              <Linkedin />
            </a>

            <a
              href="https://x.com/Omid2007hope"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 transition"
              aria-label="X profile"
            >
              <X />
            </a>
          </div>

          <p className="text-white/40 text-sm">
            Ac 2024 Omid Teimory. All Rights Reserved.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
