const nodemailer = require("nodemailer");

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT || 587;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const EMAIL_FROM = process.env.EMAIL_FROM || '"Portfolio Prime" <no-reply@portfolio-prime.com>';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || EMAIL_FROM;

let transporter;

if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
} else {
  // Mock transporter for development/testing
  console.log("No SMTP credentials configured. Email service will run in MOCK mode.");
  transporter = {
    sendMail: async (options) => {
      console.log("==========================================");
      console.log(`[MOCK EMAIL SENT]`);
      console.log(`From: ${options.from}`);
      console.log(`To: ${options.to}`);
      console.log(`Subject: ${options.subject}`);
      console.log(`Text:\n${options.text}`);
      if (options.html) {
        console.log(`HTML:\n${options.html}`);
      }
      console.log("==========================================");
      return { messageId: `mock-${Date.now()}` };
    },
  };
}

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: EMAIL_FROM,
      to,
      subject,
      text,
      html,
    });
    return info;
  } catch (error) {
    console.error("Email delivery failed:", error);
    throw error;
  }
};

const sendLoginCodeEmail = async (to, code) => {
  const subject = `Your Verification Code: ${code}`;
  const text = `Hello,

Your verification code is: ${code}

This code is valid for 15 minutes. If you did not request this code, please ignore this email.

Best regards,
Portfolio Prime Team`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #0f172a; margin-bottom: 24px;">Your Verification Code</h2>
      <p style="color: #334155; font-size: 16px; line-height: 24px;">Hello,</p>
      <p style="color: #334155; font-size: 16px; line-height: 24px;">Your verification code is:</p>
      <div style="background-color: #f1f5f9; padding: 16px; border-radius: 8px; font-size: 32px; font-weight: bold; letter-spacing: 4px; text-align: center; color: #0f172a; margin: 24px 0;">
        ${code}
      </div>
      <p style="color: #64748b; font-size: 14px; line-height: 20px;">This code is valid for 15 minutes. If you did not request this code, please ignore this email.</p>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
      <p style="color: #64748b; font-size: 12px; text-align: center;">Portfolio Prime Team</p>
    </div>
  `;

  return sendEmail({ to, subject, text, html });
};

const sendContactSubmissionAlert = async (submission) => {
  const subject = `New Contact Form Submission: ${submission.subject || "No Subject"}`;
  const text = `New submission received:

Name: ${submission.name}
Email: ${submission.email}
Subject: ${submission.subject}
Message:
${submission.message}

---
IP Address: ${submission.ipAddress || "N/A"}
User Agent: ${submission.userAgent || "N/A"}
Source: ${submission.source || "N/A"}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 24px;">New Contact Submission</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #475569; width: 120px;">Name:</td>
          <td style="padding: 8px 0; color: #0f172a;">${submission.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #475569;">Email:</td>
          <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${submission.email}">${submission.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #475569;">Subject:</td>
          <td style="padding: 8px 0; color: #0f172a;">${submission.subject}</td>
        </tr>
      </table>
      <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; border-left: 4px solid #cbd5e1; margin-bottom: 24px;">
        <h4 style="margin-top: 0; color: #475569; margin-bottom: 8px;">Message:</h4>
        <p style="color: #0f172a; margin: 0; white-space: pre-wrap; font-size: 15px; line-height: 22px;">${submission.message}</p>
      </div>
      <div style="font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 12px;">
        <p style="margin: 4px 0;"><strong>IP Address:</strong> ${submission.ipAddress || "N/A"}</p>
        <p style="margin: 4px 0;"><strong>User Agent:</strong> ${submission.userAgent || "N/A"}</p>
        <p style="margin: 4px 0;"><strong>Source:</strong> ${submission.source || "N/A"}</p>
      </div>
    </div>
  `;

  return sendEmail({ to: ADMIN_EMAIL, subject, text, html });
};

const sendWelcomeEmail = async (to, name) => {
  const subject = `Welcome to Portfolio Prime!`;
  const text = `Hello ${name || "User"},

Welcome to Portfolio Prime! Your account has been successfully created.

You can now log in using your email address and verification codes.

Best regards,
Portfolio Prime Team`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #0f172a; margin-bottom: 24px;">Welcome to Portfolio Prime!</h2>
      <p style="color: #334155; font-size: 16px; line-height: 24px;">Hello ${name || "User"},</p>
      <p style="color: #334155; font-size: 16px; line-height: 24px;">Welcome to Portfolio Prime! Your account has been successfully created.</p>
      <p style="color: #334155; font-size: 16px; line-height: 24px;">You can now log in using your email address and verification codes.</p>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
      <p style="color: #64748b; font-size: 12px; text-align: center;">Portfolio Prime Team</p>
    </div>
  `;

  return sendEmail({ to, subject, text, html });
};

module.exports = {
  sendEmail,
  sendLoginCodeEmail,
  sendContactSubmissionAlert,
  sendWelcomeEmail,
};
