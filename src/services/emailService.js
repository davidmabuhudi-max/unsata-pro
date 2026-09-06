import emailjs from "@emailjs/browser";

import { EMAIL_CONFIG } from "../config/emailConfig";

emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);

/**
 * Generic email sender
 */
export async function sendEmail({
  toEmail,
  toName,
  subject,
  title,
  message,
  extra = "",
}) {
  try {
    const response = await emailjs.send(
      EMAIL_CONFIG.SERVICE_ID,
      EMAIL_CONFIG.TEMPLATE_ID,
      {
        to_email: toEmail,
        to_name: toName,

        subject,
        title,
        message,
        extra,
      }
    );

    return {
      success: true,
      response,
    };

  } catch (error) {

    console.error("Email Error:", error);

    return {
      success: false,
      error,
    };

  }
}

/**
 * Application Submitted
 */
export async function sendApplicationReceivedEmail({
  email,
  name,
}) {

  return sendEmail({

    toEmail: email,

    toName: name,

    subject:
      "UNSATA-MUHAS Membership Application Received",

    title:
      "Application Received",

    message:
      "Thank you for applying for membership in the University Nursing Students Association of Tanzania (UNSATA) at Muhas chapter. Your application has been received successfully and is currently under review.",

    extra:
      "You will receive another email after the Membership Committee has reviewed your application.",

  });

}

/**
 * Application Approved
 */
export async function sendApprovalEmail({
  email,
  name,
  membershipNumber,
}) {

  return sendEmail({

    toEmail: email,

    toName: name,

    subject:
      "Congratulations! Your UNSATA-MUHAS Membership Has Been Approved",

    title:
      "Membership Approved",

    message:
      "Congratulations! Your application has been approved.",

    extra:
      `Membership Number: ${membershipNumber}`,

  });

}

/**
 * Application Rejected
 */
export async function sendRejectionEmail({
  email,
  name,
  reason,
}) {

  return sendEmail({

    toEmail: email,

    toName: name,

    subject:
      "UNSATA Membership Application Update",

    title:
      "Application Rejected",

    message:
      "We regret to inform you that your application has not been approved.",

    extra:
      `Reason: ${reason}`,

  });

}