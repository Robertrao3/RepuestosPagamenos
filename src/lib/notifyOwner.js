import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Fire-and-forget notification to the store owner's inbox. Never awaited by
// callers on purpose — a flaky email provider must never block or slow down
// the customer-facing request/order confirmation, since the Supabase row is
// already the source of truth.
export function notifyOwner({ subject, message, replyTo, fromName }) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn("EmailJS no está configurado (faltan variables VITE_EMAILJS_*); no se envió la notificación por correo.");
    return;
  }
  emailjs
    .send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        subject,
        message,
        from_name: fromName || "Sitio web Repuestos Pagamenos",
        reply_to: replyTo || "",
      },
      { publicKey: PUBLIC_KEY }
    )
    .catch((err) => console.error("Error enviando notificación por correo:", err));
}
