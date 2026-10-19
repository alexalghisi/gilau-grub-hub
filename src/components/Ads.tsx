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

const HOST = "https://bauval.org";

const UNITS = {
  "160x300": { key: "bfed7f4d8df18016c6f875da64ec8c6c", w: 160, h: 300 },
  "160x600": { key: "14a6819d2039ea422d2048b4e4e8bf57", w: 160, h: 600 },
  "300x250": { key: "0cb8cd6872531c399de98e10c64283e9", w: 300, h: 250 },
  "320x50": { key: "81c8ab5cf1aba97d9089ff9c299557a2", w: 320, h: 50 },
  "468x60": { key: "a3426dd8e178d99e439915ba99a2a26b", w: 468, h: 60 },
  "728x90": { key: "f2a685a19a28ebd85972756233fafcdc", w: 728, h: 90 },
} as const;

type Size = keyof typeof UNITS;

function Frame({ size }: { size: Size }) {
  const u = UNITS[size];
  const doc = `<html><body style="margin:0"><script>atOptions={'key':'${u.key}','format':'iframe','height':${u.h},'width':${u.w},'params':{}};</script><script src="${HOST}/22/${u.key}"></script></body></html>`;
  return <iframe title="Reclamă" srcDoc={doc} width={u.w} height={u.h} scrolling="no" loading="lazy" className="mx-auto block border-0" />;
}

/** Banner responsive: 728x90 desktop, 468x60 tabletă, 320x50 telefon; `box` = 300x250. */
export function AdBanner({ box }: { box?: boolean }) {
  const ok = useAdsAllowed();
  if (!ok) return null;
  return (
    <div className="mx-auto my-8 max-w-6xl px-5 text-center" aria-label="Publicitate">
      <p className="mb-1 text-[10px] uppercase tracking-widest text-muted-foreground">Publicitate</p>
      {box ? <Frame size="300x250" /> : <>
        <div className="hidden lg:block"><Frame size="728x90" /></div>
        <div className="hidden sm:block lg:hidden"><Frame size="468x60" /></div>
        <div className="sm:hidden"><Frame size="320x50" /></div>
      </>}
    </div>
  );
}

/** Coloane laterale fixe (160x600 stânga, 160x300 dreapta) — doar pe ecrane late, în afara conținutului. */
export function AdRails() {
  const ok = useAdsAllowed();
  if (!ok) return null;
  return (
    <>
      <div className="fixed left-3 top-32 z-30 hidden 2xl:block" aria-label="Publicitate"><Frame size="160x600" /></div>
      <div className="fixed right-3 top-32 z-30 hidden 2xl:block" aria-label="Publicitate"><Frame size="160x300" /></div>
    </>
  );
}

const NATIVE = "9448840f99959258719664a9622823df";

export function AdNative() {
  const ok = useAdsAllowed();
  useEffect(() => {
    if (!ok || document.getElementById("adst-native")) return;
    const s = document.createElement("script");
    s.id = "adst-native"; s.async = true; s.setAttribute("data-cfasync", "false");
    s.src = `${HOST}/21/${NATIVE}`;
    document.body.appendChild(s);
  }, [ok]);
  if (!ok) return null;
  return <div className="mx-auto my-8 max-w-6xl px-5"><div id={`container-${NATIVE}`} /></div>;
}

export function AdSocialBar() {
  const ok = useAdsAllowed();
  useEffect(() => {
    if (!ok || document.getElementById("adst-social")) return;
    const s = document.createElement("script");
    s.id = "adst-social"; s.setAttribute("data-cfasync", "false");
    s.src = `${HOST}/14/be00a599fa5067fbd7b7a9d424120b09`;
    document.body.appendChild(s);
  }, [ok]);
  return null;
}
