import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  BookOpen, Search, Send, TrendingUp, Compass, MessageCircle, UserCheck, Users, Zap,
  ShieldCheck, Award, Heart, Eye, MousePointerClick, Star, ShoppingBag, Mail, ArrowUp,
  Menu, X, Instagram, Facebook, Twitter, Linkedin, Sparkles, Check,
} from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import portrait from "@/assets/portrait.png.asset.json";
import emailShot from "@/assets/email.jpeg.asset.json";
import rankingShot from "@/assets/ranking.png.asset.json";

const EMAIL = "jasminerosebookresearch@gmail.com";
const MAILTO = `mailto:${EMAIL}?subject=Goodreads%20Listopia%20Promotion`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jasmine Rose | Goodreads Listopia Promotion for Authors" },
      { name: "description", content: "Get your book seen on Goodreads Listopia. Jasmine Rose researches and submits your book to relevant lists so real readers discover it." },
      { property: "og:title", content: "Jasmine Rose | Goodreads Listopia Promotion" },
      { property: "og:description", content: "Helping authors get discovered on Goodreads Listopia with personalized research and human outreach." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - start) / 1600, 1);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

const NAV = [
  ["About", "#about"], ["Why Listopia", "#why"], ["Services", "#services"],
  ["Results", "#results"], ["Process", "#process"], ["FAQ", "#faq"],
];

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="reveal mx-auto mb-14 max-w-2xl text-center">
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">{eyebrow}</p>
      <h2 className="text-4xl font-semibold leading-tight text-royal-deep md:text-5xl">{title}</h2>
      <div className="mx-auto mt-5 h-px w-24 bg-gold-gradient" />
      {sub && <p className="mt-5 text-muted-foreground">{sub}</p>}
    </div>
  );
}

function Btn({ href, children, variant = "gold" }: { href: string; children: React.ReactNode; variant?: "gold" | "outline" }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
  const v = variant === "gold"
    ? "bg-gold-gradient text-royal-deep shadow-gold hover:brightness-105"
    : "border border-royal/30 text-royal hover:border-gold hover:bg-cream";
  return <a href={href} className={`${base} ${v}`}>{children}</a>;
}

function Index() {
  useReveal();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <div className="overflow-x-hidden">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-card focus:p-2">Skip to content</a>

      {/* Nav */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "glass shadow-elegant py-3" : "py-5"}`}>
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6" aria-label="Main">
          <a href="#top" className="font-display text-2xl font-semibold tracking-[0.25em] text-royal-deep">
            JASMINE <span className="text-gold-gradient">ROSE</span>
          </a>
          <ul className="hidden items-center gap-8 lg:flex">
            {NAV.map(([l, h]) => (
              <li key={h}><a href={h} className="text-sm text-foreground/80 transition-colors hover:text-royal">{l}</a></li>
            ))}
          </ul>
          <div className="hidden lg:block"><Btn href="#contact">Get Started</Btn></div>
          <button className="lg:hidden text-royal-deep" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </button>
        </nav>
        {open && (
          <ul className="glass mx-4 mt-3 space-y-1 rounded-2xl p-4 lg:hidden">
            {NAV.map(([l, h]) => (
              <li key={h}><a onClick={() => setOpen(false)} href={h} className="block rounded-lg px-3 py-2 hover:bg-cream">{l}</a></li>
            ))}
            <li className="pt-2"><Btn href="#contact">Get Started</Btn></li>
          </ul>
        )}
      </header>

      <main id="main">
        {/* Hero */}
        <section id="top" className="relative bg-hero pt-32 pb-20 md:pt-40">
          {[
            ["left-[6%] top-[22%]", "-12deg", "bg-royal-gradient"],
            ["left-[44%] top-[12%]", "8deg", "bg-gold-gradient"],
            ["right-[4%] bottom-[18%]", "14deg", "bg-royal-gradient"],
            ["left-[10%] bottom-[10%]", "6deg", "bg-gold-gradient"],
          ].map(([pos, r, bg], i) => (
            <div key={i} aria-hidden className={`pointer-events-none absolute hidden md:block ${pos} animate-float opacity-60`} style={{ ["--r" as string]: r, animationDelay: `${i * 1.3}s` }}>
              <div className={`relative h-20 w-14 rounded-r-md rounded-l-sm ${bg} shadow-elegant`}>
                <div className="absolute inset-y-0 left-1.5 w-px bg-cream/50" />
                <BookOpen className="absolute inset-0 m-auto h-5 w-5 text-cream/80" />
              </div>
            </div>
          ))}
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="reveal">
              <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-royal">
                <Sparkles className="h-3.5 w-3.5 text-gold" /> Goodreads Listopia Specialist
              </span>
              <h1 className="mt-6 text-5xl font-semibold leading-[1.05] text-royal-deep md:text-6xl xl:text-7xl">
                Helping Authors Get Their Books <em className="text-gold-gradient">Seen</em> on Goodreads Listopia
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                I help authors increase their book's visibility by getting them featured on relevant Goodreads Listopia lists, helping readers discover their work organically.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Btn href="#contact">Get Started</Btn>
                <Btn href="#results" variant="outline">View Success Stories</Btn>
              </div>
              <dl className="mt-12 grid max-w-md grid-cols-3 gap-6">
                {[[150, "+", "Lists researched"], [50, "+", "Authors helped"], [100, "%", "Human outreach"]].map(([n, s, l]) => (
                  <div key={l as string}>
                    <dt className="sr-only">{l}</dt>
                    <dd className="font-display text-3xl font-semibold text-royal"><Counter to={n as number} suffix={s as string} /></dd>
                    <p className="text-xs text-muted-foreground">{l}</p>
                  </div>
                ))}
              </dl>
            </div>
            <div className="reveal relative mx-auto w-full max-w-md">
              <div className="absolute inset-4 -z-0 rounded-[2.5rem] bg-royal-gradient rotate-3 shadow-elegant" />
              <div className="absolute inset-4 rounded-[2.5rem] border-2 border-gold -rotate-3" />
              <img src={portrait.url} alt="Jasmine Rose holding a stack of books" width={460} height={460} fetchPriority="high" className="relative w-full rounded-[2.5rem] object-cover" />
              <div className="glass absolute -bottom-4 -left-4 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-elegant">
                <div className="flex text-gold">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
                <span className="text-xs font-medium text-royal-deep">Trusted by authors</span>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-24 md:py-32">
          <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 md:grid-cols-2">
            <div className="reveal relative order-2 md:order-1">
              <div className="absolute -inset-3 rounded-[2rem] bg-gold-gradient opacity-30 blur-2xl" />
              <img src={portrait.url} alt="Portrait of Jasmine Rose" loading="lazy" className="relative w-full rounded-[2rem] bg-cream shadow-elegant" />
            </div>
            <div className="reveal order-1 md:order-2">
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">About Me</p>
              <h2 className="text-4xl font-semibold text-royal-deep md:text-5xl">Meet Jasmine Rose</h2>
              <div className="mt-5 h-px w-24 bg-gold-gradient" />
              <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
                <p className="font-display text-2xl italic text-royal">Hi, I'm Jasmine Rose.</p>
                <p>I specialize in helping authors gain more exposure through Goodreads Listopia.</p>
                <p>Instead of relying only on ads or Amazon's algorithm, I help books appear on relevant Goodreads lists where real readers vote, browse, and discover new books every day.</p>
                <p>Whether you're an indie author or traditionally published, my goal is simple:</p>
                <p className="border-l-2 border-gold pl-4 font-display text-2xl text-royal-deep">Help more readers discover your book.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Listopia */}
        <section id="why" className="relative bg-royal-gradient py-24 text-primary-foreground md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="reveal mx-auto mb-14 max-w-3xl text-center">
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">Why Goodreads Listopia?</p>
              <h2 className="text-4xl font-semibold md:text-5xl">Where readers go to find their next book</h2>
              <div className="mx-auto mt-5 h-px w-24 bg-gold-gradient" />
              <p className="mt-6 text-primary-foreground/80">
                Goodreads is one of the largest communities of readers in the world. Listopia lists are viewed by thousands of readers looking for books in specific genres — and books that receive votes climb higher in rankings.
              </p>
              <p className="mt-4 font-display text-2xl text-gold-soft">Higher rankings mean:</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {[[Eye, "More visibility"], [MousePointerClick, "More clicks"], [Users, "More readers"], [Star, "More reviews"], [ShoppingBag, "More book sales"]].map(([I, t], i) => {
                const Icon = I as typeof Eye;
                return (
                  <div key={t as string} className="reveal group rounded-3xl border border-gold/30 bg-primary-foreground/5 p-6 text-center backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-gold hover:bg-primary-foreground/10" style={{ transitionDelay: `${i * 80}ms` }}>
                    <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gold-gradient text-royal-deep shadow-gold transition-transform group-hover:rotate-6">
                      <Icon className="h-6 w-6" />
                    </div>
                    <BookOpen className="mx-auto mb-2 h-4 w-4 text-gold/60" />
                    <p className="font-display text-xl">{t as string}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHead eyebrow="My Services" title="Everything your book needs to be discovered" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                [Search, "Goodreads List Research", "Find the most relevant Listopia lists for your book."],
                [Send, "Book Submission", "Submit your book to multiple Goodreads Listopia lists."],
                [TrendingUp, "Visibility Optimization", "Help your book gain more exposure inside Goodreads."],
                [Compass, "Personalized Strategy", "Recommend the best lists for your genre and audience."],
                [MessageCircle, "Author Support", "Professional communication throughout the project."],
              ].map(([I, t, d], i) => {
                const Icon = I as typeof Eye;
                return (
                  <article key={t as string} className={`reveal card-lux group p-8 ${i === 4 ? "lg:col-start-2" : ""}`}>
                    <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-royal-gradient text-gold transition-transform duration-500 group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-semibold text-royal-deep">{t as string}</h3>
                    <p className="mt-3 text-muted-foreground">{d as string}</p>
                    <a href="#contact" className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-royal transition-colors group-hover:text-gold">Enquire →</a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why choose */}
        <section className="bg-cream py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHead eyebrow="Why Choose Me" title="A boutique, author-first service" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                [UserCheck, "Personalized Research"], [Users, "Human Outreach"], [Zap, "Fast Delivery"],
                [ShieldCheck, "Honest Communication"], [Award, "Quality Service"], [Heart, "Author Focused"],
              ].map(([I, t]) => {
                const Icon = I as typeof Eye;
                return (
                  <div key={t as string} className="reveal card-lux flex items-center gap-5 p-6">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold-gradient text-royal-deep shadow-gold"><Icon className="h-5 w-5" /></div>
                    <div>
                      <p className="flex items-center gap-2 font-display text-xl font-semibold text-royal-deep"><Check className="h-4 w-4 text-gold" />{t as string}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Results */}
        <section id="results" className="py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHead eyebrow="Proof of Results" title="Real Results from Real Authors" />
            <div className="grid gap-8 lg:grid-cols-2">
              <figure className="reveal card-lux overflow-hidden p-8">
                <Mail className="h-8 w-8 text-gold" />
                <blockquote className="mt-4 font-display text-3xl leading-snug text-royal-deep">
                  "Excellent, Jasmine.<br />I found a load of Echoes listings!<br />Very cool."
                </blockquote>
                <figcaption className="mt-4 text-sm text-muted-foreground">— Steve Gerkin, author of <em>Echoes of Light</em></figcaption>
                <img src={emailShot.url} alt="Email from author Steve Gerkin thanking Jasmine for Echoes listings" loading="lazy" className="mt-6 w-full rounded-xl border border-border" />
              </figure>
              <figure className="reveal card-lux overflow-hidden p-8">
                <Award className="h-8 w-8 text-gold" />
                <h3 className="mt-4 font-display text-3xl text-royal-deep">Ranked #42 on Goodreads Listopia</h3>
                <p className="mt-2 text-muted-foreground"><em>Echoes of Light</em> placed alongside bestsellers like <em>Range</em>, <em>Pivot</em> and <em>Just Mercy</em> — with a 5.00 average rating.</p>
                <img src={rankingShot.url} alt="Goodreads Listopia ranking showing Echoes of Light at position 42" loading="lazy" className="mt-6 w-full rounded-xl border border-border" />
              </figure>
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="bg-cream py-24 md:py-32">
          <div className="mx-auto max-w-4xl px-6">
            <SectionHead eyebrow="How It Works" title="Five simple steps" />
            <ol className="relative space-y-10 before:absolute before:left-6 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-gold-gradient md:before:left-1/2">
              {["Contact Me", "Tell Me About Your Book", "I Research Relevant Goodreads Lists", "I Submit Your Book", "Your Book Gains More Visibility"].map((t, i) => (
                <li key={t} className={`reveal relative flex items-center gap-6 md:w-1/2 ${i % 2 ? "md:ml-auto md:pl-12" : "md:flex-row-reverse md:pr-12 md:text-right"}`}>
                  <span className={`z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full bg-royal-gradient font-display text-xl text-gold shadow-elegant md:absolute ${i % 2 ? "md:-left-6" : "md:-right-6"}`}>{i + 1}</span>
                  <div className="glass flex-1 rounded-2xl p-5 shadow-elegant">
                    <p className="text-xs uppercase tracking-[0.2em] text-gold">Step {i + 1}</p>
                    <p className="font-display text-2xl text-royal-deep">{t}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24 md:py-32">
          <div className="mx-auto max-w-3xl px-6">
            <SectionHead eyebrow="FAQ" title="Questions authors ask" />
            <Accordion type="single" collapsible className="reveal space-y-4">
              {[
                ["What is Goodreads Listopia?", "Listopia is Goodreads' collection of reader-created book lists, organized by genre, theme and mood. Readers browse and vote on these lists to find their next read."],
                ["How long does the process take?", "Most projects are completed within a few days, depending on your genre and the number of lists. I'll give you a clear timeline before we start."],
                ["Can you help any genre?", "Yes. Fiction, non-fiction, romance, fantasy, thriller, memoir, children's books and more — there are Listopia lists for nearly every genre."],
                ["Do you guarantee rankings?", "No honest service can guarantee rankings, because readers vote freely. I guarantee careful research and real submissions to relevant lists that give your book the best chance to be seen."],
                ["How many lists will my book be added to?", "It depends on your book and genre. I focus on relevant, active lists rather than sheer numbers, and we'll agree on the scope together."],
              ].map(([q, a], i) => (
                <AccordionItem key={q} value={`f${i}`} className="card-lux border px-6 hover:translate-y-0">
                  <AccordionTrigger className="font-display text-xl text-royal-deep hover:no-underline">{q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="px-6 pb-24">
          <div className="reveal relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-royal-gradient px-8 py-20 text-center text-primary-foreground shadow-elegant md:py-28">
            <div aria-hidden className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold-gradient opacity-25 blur-3xl" />
            <div aria-hidden className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-gold-gradient opacity-20 blur-3xl" />
            <BookOpen className="relative mx-auto h-10 w-10 text-gold" />
            <h2 className="relative mt-6 text-4xl font-semibold md:text-6xl">Ready to Get Your Book <span className="text-gold-gradient">Discovered?</span></h2>
            <p className="relative mx-auto mt-5 max-w-xl text-primary-foreground/80">Let's help more readers find your book through Goodreads Listopia.</p>
            <div className="relative mt-9"><Btn href={MAILTO}><Mail className="h-4 w-4" /> Contact Jasmine Rose</Btn></div>
            <a href={MAILTO} className="relative mt-8 inline-block break-all font-display text-xl text-gold-soft underline-offset-4 hover:underline md:text-3xl">{EMAIL}</a>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-cream">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl font-semibold tracking-[0.25em] text-royal-deep">JASMINE <span className="text-gold-gradient">ROSE</span></p>
            <p className="mt-3 text-sm text-muted-foreground">Helping Authors Get Discovered Through Goodreads Listopia</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold">Email</p>
            <a href={MAILTO} className="mt-2 block break-all text-sm text-royal hover:text-gold">{EMAIL}</a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold">Follow</p>
            <div className="mt-3 flex gap-3">
              {[[Instagram, "Instagram"], [Facebook, "Facebook"], [Twitter, "X"], [Linkedin, "LinkedIn"]].map(([I, l]) => {
                const Icon = I as typeof Eye;
                return <a key={l as string} href="#" aria-label={l as string} className="grid h-10 w-10 place-items-center rounded-full border border-border text-royal transition-all hover:-translate-y-1 hover:border-gold hover:bg-gold-gradient hover:text-royal-deep"><Icon className="h-4 w-4" /></a>;
              })}
            </div>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-muted-foreground sm:flex-row">
            <p>Copyright © 2026 Jasmine Rose</p>
            <div className="flex gap-6"><a href="#" className="hover:text-royal">Privacy Policy</a><a href="#" className="hover:text-royal">Terms of Service</a></div>
          </div>
        </div>
      </footer>

      <a href="#top" aria-label="Back to top" className={`fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full bg-gold-gradient text-royal-deep shadow-gold transition-all duration-500 hover:-translate-y-1 ${scrolled ? "opacity-100" : "pointer-events-none opacity-0"}`}>
        <ArrowUp className="h-5 w-5" />
      </a>
    </div>
  );
}
