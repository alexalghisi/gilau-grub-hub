import { useEffect, useState } from "react";

function useAdsAllowed() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const read = () => {
      try { setOk(!!JSON.parse(localStorage.getItem("oc-consent") ?? "{}").ads); } catch { setOk(false); }
    };
    read();
    window.addEventListener("oc-consent-change", read);
    return () => window.removeEventListener("oc-consent-change", read);
  }, []);
  return ok;
}

const UNITS = {
  "300x250": { key: "0cb8cd6872531c399de98e10c64283e9", w: 300, h: 250 },
  "320x50": { key: "81c8ab5cf1aba97d9089ff9c299557a2", w: 320, h: 50 },
  "728x90": { key: "f2a685a19a28ebd85972756233fafcdc", w: 728, h: 90 },
} as const;

function Frame({ size }: { size: keyof typeof UNITS }) {
  const u = UNITS[size];
  const doc = `<html><body style="margin:0"><script>atOptions={'key':'${u.key}','format':'iframe','height':${u.h},'width':${u.w},'params':{}};</script><script src="https://www.highperformanceformat.com/${u.key}/invoke.js"></script></body></html>`;
  return <iframe title="Reclamă" srcDoc={doc} width={u.w} height={u.h} scrolling="no" className="mx-auto block border-0" />;
}

/** Responsive banner: 728x90 on desktop, 320x50 on phone. */
export function AdBanner({ box }: { box?: boolean }) {
  const ok = useAdsAllowed();
  if (!ok) return null;
  return (
    <div className="mx-auto my-8 max-w-6xl px-5 text-center" aria-label="Publicitate">
      <p className="mb-1 text-[10px] uppercase tracking-widest text-muted-foreground">Publicitate</p>
      {box ? <Frame size="300x250" /> : <>
        <div className="hidden md:block"><Frame size="728x90" /></div>
        <div className="md:hidden"><Frame size="320x50" /></div>
      </>}
    </div>
  );
}

const NATIVE = "9448840f99959258719664a9622823df";

export function AdNative() {
  const ok = useAdsAllowed();
  useEffect(() => {
    if (!ok || document.getElementById("adst-native")) return;
    const s = document.createElement("script");
    s.id = "adst-native"; s.async = true; s.setAttribute("data-cfasync", "false");
    s.src = `https://pl31755119.profitableratecpmnetwork.com/${NATIVE}/invoke.js`;
    document.body.appendChild(s);
  }, [ok]);
  if (!ok) return null;
  return <div className="mx-auto my-8 max-w-6xl px-5"><div id={`container-${NATIVE}`} /></div>;
}

export function AdPopunder() {
  const ok = useAdsAllowed();
  useEffect(() => {
    if (!ok || document.getElementById("adst-pop")) return;
    const s = document.createElement("script");
    s.id = "adst-pop";
    s.src = "https://pl31905434.profitableratecpmnetwork.com/00/9c/5a/009c5ab8ae14333b7a751cad1a04a51b.js";
    document.body.appendChild(s);
  }, [ok]);
  return null;
}

export function AdSocialBar() {
  const ok = useAdsAllowed();
  useEffect(() => {
    if (!ok || document.getElementById("adst-social")) return;
    const s = document.createElement("script");
    s.id = "adst-social";
    s.src = "https://pl31755120.profitableratecpmnetwork.com/be/00/a5/be00a599fa5067fbd7b7a9d424120b09.js";
    document.body.appendChild(s);
  }, [ok]);
  return null;
}
