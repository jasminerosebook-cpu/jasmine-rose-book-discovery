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
import { startFaviconSpin, stopFaviconSpin } from "../lib/animated-favicon";

function NotFoundComponent() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-hero px-6">
      <div aria-hidden className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gold-gradient opacity-25 blur-3xl" />
      <div aria-hidden className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-royal-gradient opacity-20 blur-3xl" />
      <main className="relative max-w-xl text-center">
        <Link to="/" className="font-display text-2xl font-semibold tracking-[0.25em] text-royal-deep">
          JASMINE <span className="text-gold-gradient">ROSE</span>
        </Link>
        <p className="mt-10 font-display text-8xl font-semibold text-gold-gradient md:text-9xl">404</p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-royal-deep">This page has wandered off the shelf</h1>
        <p className="mt-4 text-muted-foreground">
          Sorry, the page you're looking for can't be found. It may have moved, or the link may be mistyped.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link to="/" className="inline-flex items-center rounded-full bg-gold-gradient px-8 py-3.5 text-sm font-medium text-royal-deep shadow-gold transition-all hover:-translate-y-0.5">
            Return Home
          </Link>
          <a href="mailto:jasminerosebookresearch@gmail.com" className="inline-flex items-center rounded-full border border-royal/30 px-8 py-3.5 text-sm font-medium text-royal transition-all hover:-translate-y-0.5 hover:border-gold hover:bg-cream">
            Contact Me
          </a>
        </div>
      </main>
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
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "Jasmine Rose" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Jost:wght@300;400;500;600&display=swap" },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
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
  const router = useRouter();
  useEffect(() => {
    startFaviconSpin();
    const done = () => stopFaviconSpin();
    if (document.readyState === "complete") done();
    else window.addEventListener("load", done, { once: true });
    const u1 = router.subscribe("onBeforeNavigate", () => startFaviconSpin());
    const u2 = router.subscribe("onResolved", () => stopFaviconSpin());
    return () => { u1(); u2(); window.removeEventListener("load", done); };
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <div className="page-enter"><Outlet /></div>
    </QueryClientProvider>
  );
}
