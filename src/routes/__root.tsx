import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header, Footer, MobileCallBar } from "@/components/SiteChrome";
import { localBusinessLd } from "@/lib/site";
import { CookieConsent } from "@/components/CookieConsent";
import { AdBanner, AdNative, AdPopunder, AdSocialBar } from "@/components/Ads";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl">404</h1>
        <p className="mt-4 text-muted-foreground">Pagina nu există sau a fost mutată.</p>
        <Link to="/" className="btn-ink mt-6">Înapoi acasă</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 text-center">
      <div>
        <h1 className="text-2xl">Pagina nu s-a încărcat</h1>
        <button onClick={() => { router.invalidate(); reset(); }} className="btn-ink mt-6">Reîncearcă</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Optim Catering — Catering Gilău & Cluj" },
      { name: "description", content: "Catering în Gilău, Florești și Cluj-Napoca." },
      { property: "og:site_name", content: "Optim Catering" },
      { property: "og:locale", content: "ro_RO" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "geo.region", content: "RO-CJ" },
      { name: "geo.placename", content: "Gilău" },
      { name: "google-adsense-account", content: "ca-pub-4079300108937036" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT,WONK@9..144,400..800,0..100,0..1&family=Nunito+Sans:wght@400;600;700;800&display=swap" },
    ],
    scripts: [
      { children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;var c=null;try{c=JSON.parse(localStorage.getItem('oc-consent')||'null')}catch(e){}var g=function(b){return b?'granted':'denied'};gtag('consent','default',{ad_storage:g(c&&c.ads),ad_user_data:g(c&&c.ads),ad_personalization:g(c&&c.personalized),analytics_storage:g(c&&c.analytics),wait_for_update:500});if(!(c&&c.personalized)){(window.adsbygoogle=window.adsbygoogle||[]).requestNonPersonalizedAds=1;}` },
      { type: "application/ld+json", children: JSON.stringify(localBusinessLd) },
      { async: true, src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4079300108937036", crossOrigin: "anonymous" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ro">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main className="pb-14 md:pb-0">
        <AdBanner />
        <Outlet />
        <AdBanner box />
        <AdNative />
      </main>
      <Footer />
      <MobileCallBar />
      <CookieConsent />
      <AdSocialBar />
      <AdPopunder />
    </QueryClientProvider>
  );
}
