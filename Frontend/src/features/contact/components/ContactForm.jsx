"use client";

import { useContactForm } from "@/features/contact/hooks/useContactForm";
import { getContactFormTitle } from "@/lib/site-content";

function ContactForm({ profile }) {
  const { form, status, isSubmitting, updateField, submit } = useContactForm();

  return (
    <form onSubmit={submit} className="space-y-6 lg:col-span-2">
      <h2 className="text-2xl font-bold tracking-tight">
        {getContactFormTitle(profile)}
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field
          id="contact-name"
          label="Name"
          name="name"
          placeholder="Enter your name"
          value={form.name}
          onChange={updateField}
          autoComplete="name"
        />
        <Field
          id="contact-email"
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email address"
          value={form.email}
          onChange={updateField}
          autoComplete="email"
        />
      </div>

      <Field
        id="contact-subject"
        label="Subject"
        name="subject"
        placeholder="What is this about?"
        value={form.subject}
        onChange={updateField}
        autoComplete="off"
      />

      <Field
        id="contact-message"
        label="Message"
        name="message"
        placeholder="Write your message here..."
        value={form.message}
        onChange={updateField}
        as="textarea"
        className="h-40 resize-none"
      />

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
  );
}

function Field({
  as: Component = "input",
  id,
  label,
  className = "",
  ...props
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">
        {label}
      </label>
      <Component
        id={id}
        required
        className={`w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder-white/50 ${className}`.trim()}
        {...props}
      />
    </div>
  );
}

export default ContactForm;
