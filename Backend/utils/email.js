const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;
const EMAILJS_PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;

const sendEmailJs = async (templateId, templateParams) => {
  if (!EMAILJS_SERVICE_ID || !EMAILJS_PUBLIC_KEY) {
    console.warn("EmailJS credentials missing. Logging parameters instead:", templateParams);
    return { mock: true, messageId: `mock-${Date.now()}` };
  }

  const payload = {
    service_id: EMAILJS_SERVICE_ID,
    template_id: templateId || EMAILJS_TEMPLATE_ID,
    user_id: EMAILJS_PUBLIC_KEY,
    template_params: templateParams,
  };

  // Only include private key if present
  if (EMAILJS_PRIVATE_KEY) {
    payload.accessToken = EMAILJS_PRIVATE_KEY;
  }

  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`EmailJS sending failed: ${response.status} - ${errorText}`);
  }

  return { success: true };
};

const sendLoginCodeEmail = async (to, code, expiresAt) => {
  const expiry = expiresAt || new Date(Date.now() + 15 * 60 * 1000);
  const timeString = new Date(expiry).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return sendEmailJs(EMAILJS_TEMPLATE_ID, {
    email: to,
    passcode: code,
    time: timeString,
  });
};

const sendContactSubmissionAlert = async (submission) => {
  console.log("==========================================");
  console.log(`[CONTACT SUBMISSION RECEIVED]`);
  console.log(`Name: ${submission.name}`);
  console.log(`Email: ${submission.email}`);
  console.log(`Subject: ${submission.subject}`);
  console.log(`Message:\n${submission.message}`);
  console.log("==========================================");
  
  // If user configures a template for contact submissions, we can trigger it:
  // return sendEmailJs("contact_template_id", { ... });
  return { mock: true };
};

const sendWelcomeEmail = async (to, name) => {
  console.log("==========================================");
  console.log(`[WELCOME EMAIL] To: ${to}, Name: ${name}`);
  console.log("==========================================");
  
  // If user configures a template for welcome email, we can trigger it:
  // return sendEmailJs("welcome_template_id", { email: to, name });
  return { mock: true };
};

module.exports = {
  sendLoginCodeEmail,
  sendContactSubmissionAlert,
  sendWelcomeEmail,
};
