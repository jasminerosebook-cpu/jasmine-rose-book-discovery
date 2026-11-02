// Rotates the favicon (drawn to a canvas) while the site is loading.
const SRC = "/favicon.svg";
const SIZE = 64;
const PERIOD = 2400; // ms per full turn — slow and calm

let img: HTMLImageElement | null = null;
let link: HTMLLinkElement | null = null;
let raf = 0;
let start = 0;
let stopRequested = false;

function setup() {
  if (link) return;
  link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
  img = new Image();
  img.src = SRC;
}

function draw(angle: number) {
  if (!img?.complete || !link) return;
  const c = document.createElement("canvas");
  c.width = c.height = SIZE;
  const ctx = c.getContext("2d");
  if (!ctx) return;
  ctx.translate(SIZE / 2, SIZE / 2);
  ctx.rotate(angle);
  ctx.drawImage(img, -SIZE / 2, -SIZE / 2, SIZE, SIZE);
  link.type = "image/png";
  link.href = c.toDataURL("image/png");
}

function frame(t: number) {
  const p = ((t - start) % PERIOD) / PERIOD;
  // Stop only once the turn completes, so the icon settles upright.
  if (stopRequested && t - start >= PERIOD && p < 0.05) {
    raf = 0;
    if (link) { link.type = "image/svg+xml"; link.href = SRC; }
    return;
  }
  draw(p * Math.PI * 2);
  raf = requestAnimationFrame(frame);
}

export function startFaviconSpin() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  setup();
  stopRequested = false;
  if (!raf) { start = performance.now(); raf = requestAnimationFrame(frame); }
}

export function stopFaviconSpin() {
  stopRequested = true;
}
