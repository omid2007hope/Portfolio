import SiteFooter from "@/components/layout/SiteFooter";
import ContactDetailsPanel from "@/features/contact/components/ContactDetailsPanel";
import ContactForm from "@/features/contact/components/ContactForm";
import ContactIntroSection from "@/features/contact/components/ContactIntroSection";

function ContactPage({ profile }) {
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

        <ContactIntroSection profile={profile} />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <ContactForm profile={profile} />
          <ContactDetailsPanel profile={profile} />
        </div>

        <SiteFooter profile={profile} />
      </div>
    </section>
  );
}

export default ContactPage;
