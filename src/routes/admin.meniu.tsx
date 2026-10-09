import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { checkAdmin, extractDailyMenu, saveDailyMenu, type PublicItem } from "@/lib/menus.functions";

export const Route = createFileRoute("/admin/meniu")({
  head: () => ({
    meta: [
      { title: "Adaugă meniul zilei — Optim Catering" },
      { name: "description", content: "Panou intern pentru meniul zilei." },
      { property: "og:title", content: "Adaugă meniul zilei — Optim Catering" },
      { property: "og:description", content: "Panou intern pentru meniul zilei." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminMenu,
});

const ALLERGENS = ["gluten", "lapte", "ouă", "pește", "crustacee", "moluște", "arahide", "nuci", "soia", "țelină", "muștar", "susan", "sulfiți", "lupin"];

async function shrink(file: File): Promise<string> {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, 1400 / Math.max(bmp.width, bmp.height));
  const c = document.createElement("canvas");
  c.width = Math.round(bmp.width * scale);
  c.height = Math.round(bmp.height * scale);
  c.getContext("2d")!.drawImage(bmp, 0, 0, c.width, c.height);
  return c.toDataURL("image/jpeg", 0.85);
}

const today = () => new Date().toISOString().slice(0, 10);

function AdminMenu() {
  const check = useServerFn(checkAdmin);
  const extract = useServerFn(extractDailyMenu);
  const save = useServerFn(saveDailyMenu);
  const [key, setKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [text, setText] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [paths, setPaths] = useState<string[]>([]);
  const [items, setItems] = useState<PublicItem[] | null>(null);
  const [date, setDate] = useState(today());
  const [busy, setBusy] = useState<"" | "ai" | "save">("");
  const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null);

  useEffect(() => {
    const k = sessionStorage.getItem("oc-admin");
    if (k) { setKey(k); setAuthed(true); }
  }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    try { await check({ data: { key } }); sessionStorage.setItem("oc-admin", key); setAuthed(true); setMsg(null); }
    catch (err) { setMsg({ ok: false, t: err instanceof Error ? err.message : "Eroare" }); }
  };

  const addFiles = async (files: FileList | null) => {
    if (!files) return;
    const next = await Promise.all(Array.from(files).slice(0, 6 - photos.length).map(shrink));
    setPhotos((p) => [...p, ...next].slice(0, 6));
  };

  const runAI = async () => {
    setBusy("ai"); setMsg(null);
    try {
      const r = await extract({ data: { key, text, images: photos } });
      setPaths(r.paths);
      setItems(r.items.length ? r.items : [{ name: "", description: null, category: null, price: null, allergens: [] }]);
      if (r.error) setMsg({ ok: false, t: r.error });
    } catch (err) { setMsg({ ok: false, t: err instanceof Error ? err.message : "Eroare" }); }
    setBusy("");
  };

  const upd = (i: number, patch: Partial<PublicItem>) => setItems((arr) => arr!.map((it, j) => (j === i ? { ...it, ...patch } : it)));

  const publish = async (published: boolean) => {
    if (!items) return;
    setBusy("save"); setMsg(null);
    try {
      await save({ data: { key, menu_date: date, text, items: items.filter((i) => i.name.trim()), paths, published } });
      setMsg({ ok: true, t: published ? "Meniul a fost publicat pe site." : "Meniul a fost salvat ca ciornă." });
      setItems(null); setText(""); setPhotos([]); setPaths([]);
    } catch (err) { setMsg({ ok: false, t: err instanceof Error ? err.message : "Eroare" }); }
    setBusy("");
  };

  if (!authed) {
    return (
      <div className="mx-auto max-w-md px-5 py-20">
        <p className="eyebrow">Administrare</p>
        <h1 className="mt-3 text-4xl">Meniul zilei</h1>
        <form onSubmit={login} className="mt-8 space-y-4">
          <label htmlFor="k" className="block text-sm font-semibold">Cheia de administrator</label>
          <input id="k" type="password" className="field" value={key} onChange={(e) => setKey(e.target.value)} required />
          <button className="btn-ink w-full">Intră</button>
          {msg && <p className="text-sm text-destructive">{msg.t}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-14">
      <p className="eyebrow">Administrare</p>
      <h1 className="mt-3 text-4xl md:text-5xl">Adaugă meniul zilei</h1>
      <p className="mt-3 text-muted-foreground">Lipește textul postării de pe Facebook și adaugă pozele. AI-ul extrage felurile, prețurile și alergenii — tu verifici și publici.</p>

      <section className="panel mt-10 space-y-5 p-6">
        <div>
          <label htmlFor="t" className="block text-sm font-semibold">1. Textul postării</label>
          <textarea id="t" rows={7} className="field mt-2" value={text} onChange={(e) => setText(e.target.value)} placeholder="Meniul zilei: Ciorbă de perișoare 15 lei..." />
        </div>
        <div>
          <p className="text-sm font-semibold">2. Pozele (max. 6)</p>
          <div className="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-6">
            {photos.map((p, i) => (
              <button key={i} type="button" onClick={() => setPhotos((a) => a.filter((_, j) => j !== i))} className="group relative aspect-square overflow-hidden border-2 border-foreground" aria-label="Șterge poza">
                <img src={p} alt="" className="h-full w-full object-cover" />
                <span className="absolute inset-0 hidden items-center justify-center bg-foreground/70 text-xs font-bold text-background group-hover:flex">Șterge</span>
              </button>
            ))}
            {photos.length < 6 && (
              <label className="flex aspect-square cursor-pointer items-center justify-center border-2 border-dashed border-foreground text-2xl">
                +<input type="file" accept="image/*" multiple className="sr-only" onChange={(e) => addFiles(e.target.files)} />
              </label>
            )}
          </div>
        </div>
        <button className="btn-ink" disabled={busy !== "" || (!text.trim() && !photos.length)} onClick={runAI}>
          {busy === "ai" ? "AI-ul citește meniul…" : "3. Citește meniul cu AI"}
        </button>
      </section>

      {msg && <p className={`mt-6 border-2 p-4 text-sm ${msg.ok ? "border-foreground" : "border-destructive text-destructive"}`}>{msg.t}</p>}

      {items && (
        <section className="panel mt-8 p-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-2xl">4. Verifică meniul</h2>
            <label className="text-sm font-semibold">Data <input type="date" className="field mt-1" value={date} onChange={(e) => setDate(e.target.value)} /></label>
          </div>
          <div className="mt-6 space-y-5">
            {items.map((it, i) => (
              <div key={i} className="border-t-2 border-foreground pt-4">
                <div className="grid gap-3 md:grid-cols-[1fr_1fr_110px_auto]">
                  <input className="field" placeholder="Denumire" value={it.name} onChange={(e) => upd(i, { name: e.target.value })} />
                  <input className="field" placeholder="Descriere / garnitură" value={it.description ?? ""} onChange={(e) => upd(i, { description: e.target.value || null })} />
                  <input className="field" type="number" min={0} placeholder="Lei" value={it.price ?? ""} onChange={(e) => upd(i, { price: e.target.value === "" ? null : Number(e.target.value) })} />
                  <button className="btn-outline !px-4" onClick={() => setItems((a) => a!.filter((_, j) => j !== i))}>Șterge</button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {ALLERGENS.map((a) => {
                    const on = it.allergens.includes(a);
                    return (
                      <button key={a} type="button" onClick={() => upd(i, { allergens: on ? it.allergens.filter((x) => x !== a) : [...it.allergens, a] })}
                        className={`border-2 border-foreground px-2 py-0.5 text-xs font-semibold ${on ? "bg-foreground text-background" : ""}`}>
                        {a}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <button className="btn-outline mt-5" onClick={() => setItems((a) => [...a!, { name: "", description: null, category: null, price: null, allergens: [] }])}>+ Adaugă fel</button>
          <div className="mt-8 flex flex-wrap gap-3 border-t-2 border-foreground pt-6">
            <button className="btn-ink" disabled={busy !== ""} onClick={() => publish(true)}>{busy === "save" ? "Se salvează…" : "Publică pe site"}</button>
            <button className="btn-outline" disabled={busy !== ""} onClick={() => publish(false)}>Salvează ciornă</button>
          </div>
        </section>
      )}
    </div>
  );
}
