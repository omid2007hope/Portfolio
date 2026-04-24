"use client";

import { useState } from "react";
import { CONTACT_FORM_DEFAULTS } from "@/features/contact/constants/contactFormDefaults";
import { createContactSubmission } from "@/features/contact/services/contactService";

export function useContactForm() {
  const [form, setForm] = useState(CONTACT_FORM_DEFAULTS);
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();

    if (Object.values(form).some((value) => !value.trim())) {
      setStatus({ type: "error", message: "Please fill in all fields." });
      return false;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      await createContactSubmission(form);
      setStatus({ type: "success", message: "Message sent successfully." });
      setForm(CONTACT_FORM_DEFAULTS);
      return true;
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Failed to send message. Please try again.",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    status,
    isSubmitting,
    updateField,
    submit,
  };
}
