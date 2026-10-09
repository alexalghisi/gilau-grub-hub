import { createOpenAI } from "@ai-sdk/openai";
import { streamText, Output } from "ai";
import { z } from "zod";

export const itemSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  category: z.string().nullable(),
  price: z.number().nullable(),
  allergens: z.array(z.string()),
});
export type ExtractedItem = z.infer<typeof itemSchema>;

const INSTRUCTIONS = `Ești asistentul restaurantului Optim Catering din Gilău. Primești textul și pozele unei postări de Facebook cu meniul zilei.
Extrage fiecare fel de mâncare: nume (scurt, cu majusculă), descriere (garnitură, detalii) sau null, categorie (Supă/Ciorbă, Fel principal, Garnitură, Salată, Desert, Băutură sau null), preț în lei ca număr sau null dacă lipsește.
Alergeni: deduce din ingrediente doar alergenii UE evidenți, în română: gluten, lapte, ouă, pește, crustacee, moluște, arahide, nuci, soia, țelină, muștar, susan, sulfiți, lupin. Listă goală dacă nu e clar.
Nu inventa feluri care nu apar. Citește și textul din poze.`;

export async function extractMenu(text: string, images: { base64: string; mediaType: string }[]) {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) throw new Error("AI neconfigurat");
  let runId: string | undefined;
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: async (input, init) => {
      const h = new Headers(init?.headers);
      if (runId) h.set("X-Lovable-AIG-Run-ID", runId);
      const r = await fetch(input, { ...init, headers: h });
      runId ??= r.headers.get("X-Lovable-AIG-Run-ID") ?? undefined;
      return r;
    },
  });
  const result = streamText({
    model: provider.responses("openai/gpt-6-astra"),
    system: INSTRUCTIONS,
    output: Output.object({ schema: z.object({ items: z.array(itemSchema) }) }),
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: text?.trim() ? `Textul postării:\n${text}` : "Nu există text, folosește doar pozele." },
          ...images.map((i) => ({ type: "file" as const, data: i.base64, mediaType: i.mediaType })),
        ],
      },
    ],
    providerOptions: {
      openai: {
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        store: false,
        include: ["reasoning.encrypted_content"],
      },
    },
  });
  const out = await result.output;
  return out.items;
}
