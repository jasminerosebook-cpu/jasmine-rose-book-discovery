import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function BrandBar() {
  return (
    <header className="border-b border-border bg-cream">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5" aria-label="Main">
        <Link to="/" className="font-display text-2xl font-semibold tracking-[0.25em] text-royal-deep">
          JASMINE <span className="text-gold-gradient">ROSE</span>
        </Link>
        <Link to="/" className="text-sm text-royal hover:text-gold">← Back to home</Link>
      </nav>
    </header>
  );
}

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <BrandBar />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-xs uppercase tracking-[0.25em] text-gold">Legal</p>
        <h1 className="mt-3 font-display text-5xl font-semibold text-royal-deep">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: November 2026</p>
        <div className="mt-10 space-y-6 leading-relaxed text-foreground/85 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-royal-deep">
          {children}
        </div>
      </main>
      <footer className="border-t border-border bg-cream py-6 text-center text-xs text-muted-foreground">
        <div className="mb-2 flex justify-center gap-6">
          <Link to="/privacy-policy" className="hover:text-royal">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:text-royal">Terms of Service</Link>
        </div>
        Copyright © 2026 Jasmine Rose
      </footer>
    </div>
  );
}
