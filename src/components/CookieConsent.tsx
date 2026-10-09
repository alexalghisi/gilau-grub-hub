import { useEffect, useState } from "react";

type Consent = { analytics: boolean; ads: boolean; personalized: boolean };
const KEY = "oc-consent";

function apply(c: Consent) {
  localStorage.setItem(KEY, JSON.stringify(c));
  const w = window as unknown as { gtag?: (...a: unknown[]) => void };
  const g = (b: boolean) => (b ? "granted" : "denied");
  w.gtag?.("consent", "update", {
    ad_storage: g(c.ads),
    ad_user_data: g(c.ads),
    ad_personalization: g(c.personalized),
    analytics_storage: g(c.analytics),
  });
}

export function openCookieSettings() {
  window.dispatchEvent(new Event("oc-open-consent"));
}

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [c, setC] = useState<Consent>({ analytics: false, ads: false, personalized: false });

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved) {
      try { setC(JSON.parse(saved)); } catch { setOpen(true); }
    } else setOpen(true);
    const h = () => { setDetails(true); setOpen(true); };
    window.addEventListener("oc-open-consent", h);
    return () => window.removeEventListener("oc-open-consent", h);
  }, []);

  const save = (v: Consent) => { apply(v); setC(v); setOpen(false); setDetails(false); };

  if (!open) {
    return (
      <button
        onClick={() => { setDetails(true); setOpen(true); }}
        className="fixed bottom-4 left-3 z-40 hidden rounded-2xl border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground shadow-sm hover:text-foreground md:block"
        aria-label="Setări cookie-uri"
      >
        Cookie-uri
      </button>
    );
  }

  const Row = ({ k, title, desc }: { k: keyof Consent; title: string; desc: string }) => (
    <label className="flex items-start justify-between gap-4 border-t border-border py-3">
      <span>
        <span className="block text-sm font-semibold">{title}</span>
        <span className="block text-xs text-muted-foreground">{desc}</span>
      </span>
      <input
        type="checkbox"
        className="mt-1 h-5 w-5 accent-primary"
        checked={c[k]}
        onChange={(e) => setC({ ...c, [k]: e.target.checked })}
      />
    </label>
  );

  return (
    <div role="dialog" aria-modal="false" aria-labelledby="cc-title"
      className="fixed inset-x-3 bottom-16 z-50 mx-auto max-w-xl rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-2xl md:bottom-6">
      <h2 id="cc-title" className="text-lg">Respectăm confidențialitatea ta</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Folosim cookie-uri necesare pentru funcționarea site-ului și, cu acordul tău, cookie-uri pentru statistici și
        reclame (Google AdSense), inclusiv reclame personalizate. Poți schimba oricând alegerea din butonul „Cookie-uri”.
      </p>

      {details && (
        <div className="mt-4">
          <div className="flex items-start justify-between gap-4 py-3">
            <span>
              <span className="block text-sm font-semibold">Necesare</span>
              <span className="block text-xs text-muted-foreground">Esențiale pentru site. Mereu active.</span>
            </span>
            <input type="checkbox" checked disabled className="mt-1 h-5 w-5" />
          </div>
          <Row k="analytics" title="Statistici" desc="Ne ajută să înțelegem cum este folosit site-ul." />
          <Row k="ads" title="Reclame" desc="Permite afișarea reclamelor și măsurarea lor." />
          <Row k="personalized" title="Reclame personalizate" desc="Reclame adaptate intereselor tale." />
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <button className="btn-ink" onClick={() => save({ analytics: true, ads: true, personalized: true })}>
          Accept tot
        </button>
        <button className="btn-outline" onClick={() => save({ analytics: false, ads: false, personalized: false })}>
          Refuz
        </button>
        {details ? (
          <button className="btn-outline" onClick={() => save({ ...c, personalized: c.personalized && c.ads })}>
            Salvează preferințele
          </button>
        ) : (
          <button className="btn-outline" onClick={() => setDetails(true)}>
            Modifică preferințele
          </button>
        )}
      </div>
    </div>
  );
}
