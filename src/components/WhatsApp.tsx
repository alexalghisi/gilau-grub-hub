import type { ReactNode } from "react";
import { SITE } from "@/lib/site";

export const WA_TEXT =
  "Bună ziua! V-am descoperit pe optimcatering.ro și aș dori să plasez o comandă";

/** Link wa.me care deschide WhatsApp cu mesajul deja scris. `topic` e adăugat la final (ex. „platouri pentru 20 de persoane”). */
export const waHref = (topic?: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(topic ? `${WA_TEXT} – ${topic}` : WA_TEXT)}`;

export function WaIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.43 9.43 0 0 1-1.44-5.02c0-5.2 4.24-9.43 9.44-9.43a9.4 9.4 0 0 1 6.67 2.77 9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.45 9.43m8.04-17.47A11.3 11.3 0 0 0 12.05.7C5.78.7.68 5.8.68 12.06c0 2 .52 3.96 1.52 5.68L.58 23.3l5.7-1.5a11.33 11.33 0 0 0 5.77 1.47h.01c6.26 0 11.36-5.1 11.37-11.36 0-3.03-1.18-5.89-3.33-8.03" />
    </svg>
  );
}

export function WhatsAppLink({ topic, className, children, label = "Scrie-ne pe WhatsApp" }: { topic?: string; className?: string; children: ReactNode; label?: string }) {
  return (
    <a href={waHref(topic)} target="_blank" rel="noopener" aria-label={label} className={className}>
      {children}
    </a>
  );
}

/** Buton plutitor WhatsApp — doar pe desktop (pe telefon există bara de jos). */
export function WhatsAppFloat() {
  return (
    <a
      href={waHref()}
      target="_blank"
      rel="noopener"
      aria-label="Comandă pe WhatsApp"
      className="fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl md:inline-flex"
    >
      <WaIcon className="h-5 w-5" /> WhatsApp
    </a>
  );
}
