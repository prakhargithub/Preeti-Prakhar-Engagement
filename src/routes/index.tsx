import { createFileRoute } from "@tanstack/react-router";
import { createElement, useCallback, useEffect, useRef, useState, type ElementType } from "react";
import { CalendarDays, Clock3, Heart, MapPin, Music2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import coupleImage from "@/assets/couple.jpg";
import chaiImage from "@/assets/chai.jpg";
import ringImage from "@/assets/rings.jpg";
import ganeshImage from "@/assets/ganesh-blessing.png";
const SONG_URL = "/audio/vaaroon-forever.mp3";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Preeti & Prakhar — Engagement Invitation" },
      { name: "description", content: "You are invited to celebrate the engagement of Preeti and Prakhar on 16 October at Hotel Swagat, Raebareli." },
      { property: "og:title", content: "Preeti & Prakhar are getting engaged" },
      { property: "og:description", content: "Join us on 16 October, 11 AM onwards, at Hotel Swagat, Raebareli." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Invitation,
});

const EVENT_DATE = new Date("2026-10-16T11:00:00+05:30");
type MusicController = { stop: () => void };

function playMelody(): MusicController | null {
  const audio = new Audio(SONG_URL);
  audio.preload = "auto";
  audio.loop = true;
  audio.volume = 0.75;
  void audio.play().catch(() => {
    // Playback can be rejected by the browser; the invitation still works.
  });
  return { stop: () => { audio.pause(); audio.currentTime = 0; } };
}

function Invitation() {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [muted, setMuted] = useState(false);
  const [dateRevealed, setDateRevealed] = useState(false);
  const audioRef = useRef<MusicController | null>(null);

  useEffect(() => () => audioRef.current?.stop(), []);

  const openInvitation = () => {
    setOpening(true);
    window.setTimeout(() => setOpened(true), 1100);
    try {
      audioRef.current = playMelody();
    } catch {
      audioRef.current = null;
    }
  };

  const toggleMusic = () => {
    audioRef.current?.stop();
    audioRef.current = muted ? playMelody() : null;
    setMuted(!muted);
  };

  if (!opened) return <EnvelopeScreen opening={opening} onOpen={openInvitation} />;

  return (
    <main className="invitation-pattern min-h-screen bg-background text-foreground animate-in fade-in duration-700">
      <Button variant="icon" onClick={toggleMusic} aria-label={muted ? "Play music" : "Mute music"} className="fixed right-4 top-4 z-40 size-11 p-0">
        {muted ? <VolumeX className="size-4" /> : <Music2 className="size-4" />}
      </Button>
      <FallingPetals />

      <section className="relative px-4 pt-12 text-center sm:px-5 sm:pt-14">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[.3em] text-primary">You are invited</p>
        <img src={ganeshImage} alt="Lord Ganesha blessing the celebration" className="mx-auto h-36 w-36 object-contain sm:h-44 sm:w-44" width={816} height={816} />
        <p className="font-display mt-2 text-base text-primary sm:text-lg">॥ श्री गणेशाय नमः ॥</p>
        <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।<br />निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥</p>
      </section>

      <section className="relative mx-auto flex min-h-[88svh] max-w-6xl items-center px-4 py-12 sm:px-5 sm:py-16 lg:px-10">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
          <div className="relative z-10 text-center lg:text-left">
            <p className="mx-auto mb-5 max-w-xl text-xs font-semibold uppercase leading-5 tracking-[.2em] text-primary lg:mx-0">With the blessings of God, our ancestors and elders, together with their families</p>
            <p className="font-script text-4xl leading-tight text-primary min-[360px]:text-5xl sm:text-6xl">My daughter is getting engaged</p>
            <h1 className="mt-5 flex flex-col items-center text-primary lg:items-start">
              <span className="font-names text-6xl leading-none min-[360px]:text-7xl sm:text-8xl lg:text-7xl xl:text-8xl">Prakhar</span>
              <span className="my-1 flex items-center gap-3 text-gold lg:pl-10">
                <span className="h-px w-8 bg-gold/40" />
                <span className="font-romance text-4xl font-light italic">&</span>
                <span className="h-px w-8 bg-gold/40" />
              </span>
              <span className="font-names text-6xl leading-none min-[360px]:text-7xl sm:text-8xl lg:text-7xl xl:text-8xl">Preeti</span>
            </h1>
            <div className="mx-auto my-7 flex max-w-md items-center justify-center gap-3 text-gold lg:mx-0">
              <span className="h-px flex-1 bg-gold/40" /><Heart className="size-5 fill-current" /><span className="h-px flex-1 bg-gold/40" />
            </div>
            <p className="mx-auto max-w-xl text-lg leading-relaxed text-ink-soft lg:mx-0">Two hearts, one promise, and a beautiful beginning. We would be delighted to have you with us.</p>
            {dateRevealed && (
              <div className="mt-7 flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm font-semibold animate-in fade-in duration-500 lg:justify-start">
                <span className="inline-flex items-center gap-2"><CalendarDays className="size-4 text-primary" />16 October 2026</span>
                <span className="inline-flex items-center gap-2"><Clock3 className="size-4 text-primary" />11 AM onwards</span>
              </div>
            )}
            <p className="font-script mt-8 text-3xl text-primary">#PreetiKaPrakhar</p>
          </div>
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-3 rotate-2 rounded-[48%_48%_45%_45%] border border-gold/40" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[48%_48%_45%_45%] border-8 border-card shadow-2xl">
              <img src={coupleImage} alt="Illustration of Preeti and Prakhar in engagement attire" className="h-full w-full object-cover" width={1200} height={1504} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/55 px-4 py-16 text-center sm:px-5 sm:py-20">
        <p className="font-script text-4xl text-primary">Save the date</p>
        <TypeOnScroll as="h2" text="A little surprise awaits" className="font-display mt-2 text-4xl" />
        <TypeOnScroll as="p" text="Scratch the golden card to uncover our special date." className="mx-auto mt-3 max-w-lg text-muted-foreground" speed={22} />
        <ScratchReveal onReveal={() => setDateRevealed(true)} />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-5 sm:py-24 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden rounded-md shadow-xl">
            <img src={chaiImage} alt="Preeti and Prakhar sharing chai together" className="aspect-[7/5] h-full w-full object-cover" loading="lazy" width={1408} height={912} />
          </div>
          <div>
            <p className="font-script text-4xl text-primary">Our story</p>
            <TypeOnScroll as="h2" text="From Strangers to Soulmates" className="font-display mt-2 text-4xl sm:text-5xl" />
            <div className="mt-7 space-y-5 leading-7 text-ink-soft">
              <TypeOnScroll as="p" text="Both families met, and what began as a simple introduction soon grew into something more. We first met as friends, where a shared laugh over a cup of chai soon turned into hours of conversation. What began as a simple friendship slowly blossomed into something deeper — a love built on respect, adventure, laughter, and, of course, endless cups of chai." speed={12} />
              <TypeOnScroll as="p" text="Through festive celebrations, late-night conversations, little adventures, and countless beautiful memories, we slowly realized that we had found something truly special in each other." speed={14} delay={180} />
              <TypeOnScroll as="p" text="And now, after all the moments that brought us here, we're ready to begin the next beautiful chapter of our story — surrounded by the people we love most." speed={14} delay={180} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card px-4 py-16 text-center sm:px-5 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <img src={ringImage} alt="Preeti and Prakhar exchanging engagement rings" className="aspect-[16/10] w-full rounded-md object-cover shadow-xl" loading="lazy" width={1408} height={912} />
          <TypeOnScroll as="p" text="Come celebrate with us" className="font-script mt-10 text-5xl text-primary" />
          <div className={`mt-8 grid gap-6 ${dateRevealed ? "sm:grid-cols-3" : "sm:grid-cols-1"}`}>
            {dateRevealed && <Detail icon={<CalendarDays />} label="Date" value="16 October 2026" />}
            {dateRevealed && <Detail icon={<Clock3 />} label="Time" value="11 AM onwards" />}
            <Detail icon={<MapPin />} label="Venue" value="Hotel Swagat, Raebareli" />
          </div>
          <a href="https://maps.app.goo.gl/TameYYKrqrssi7fH7" target="_blank" rel="noopener noreferrer" className="mt-9 inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:-translate-y-0.5">
            <MapPin className="size-4" />View venue on map
          </a>
        </div>
      </section>

      <footer className="px-5 py-16 text-center">
        <p className="font-script text-5xl text-primary">With love,</p>
        <p className="font-display mt-2 text-3xl">Preeti & Prakhar</p>
        <p className="mt-5 text-sm text-muted-foreground">We can’t wait to celebrate with you.</p>
      </footer>
    </main>
  );
}

function TypeOnScroll({
  text,
  as = "p",
  className = "",
  speed = 38,
  delay = 80,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  speed?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [length, setLength] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLength(text.length);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setStarted(true);
        observer.disconnect();
      }
    }, { threshold: 0.22 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [text]);

  useEffect(() => {
    if (!started) return;
    let interval = 0;
    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setLength((current) => {
          if (current >= text.length) {
            window.clearInterval(interval);
            return current;
          }
          return current + 1;
        });
      }, speed);
    }, delay);
    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [delay, speed, started, text]);

  return createElement(as, { ref, className: `type-on-scroll ${className}` },
    createElement("span", { className: "sr-only" }, text),
    createElement("span", { "aria-hidden": true, className: "type-on-scroll-space" }, text),
    createElement("span", {
      "aria-hidden": true,
      className: `type-on-scroll-copy ${started && length < text.length ? "type-on-scroll-active" : ""}`,
    }, text.slice(0, length)),
  );
}

function EnvelopeScreen({ opening, onOpen }: { opening: boolean; onOpen: () => void }) {
  return (
    <main className="invitation-pattern flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 text-center">
      <FallingPetals />
      <div className="relative z-10 envelope-enter">
        <Button
          variant="ghost"
          type="button"
          onClick={onOpen}
          disabled={opening}
          aria-label="Tap to open the engagement invitation"
          className={`group relative mx-auto block h-48 w-[min(86vw,360px)] rounded-none bg-transparent p-0 shadow-none hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:h-56 ${opening ? "" : "envelope-shake"}`}
        >
          <div className="absolute inset-0 overflow-hidden rounded-sm bg-petal shadow-2xl" />
          <div className={`absolute left-[8%] right-[8%] top-[14%] z-10 h-[78%] rounded-sm bg-card shadow-md ${opening ? "letter-rise" : ""}`} />
          <div className="envelope-pocket absolute inset-0 z-20 rounded-sm bg-primary/20" />
          <div className={`envelope-flap absolute inset-x-0 top-0 z-30 h-[55%] origin-top bg-primary ${opening ? "flap-open" : ""}`} />
          <span className="soft-pulse absolute left-1/2 top-[46%] z-40 flex h-14 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-primary/20 bg-primary px-3 text-[11px] font-semibold uppercase tracking-[.14em] text-primary-foreground shadow-lg">
            Tap to open
          </span>
        </Button>
      </div>
    </main>
  );
}

function Detail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="border-t border-gold/35 pt-6"><div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-full bg-secondary text-primary">{icon}</div><p className="text-xs font-semibold uppercase tracking-[.2em] text-muted-foreground">{label}</p><p className="font-display mt-2 text-lg">{value}</p></div>;
}

function ScratchReveal({ onReveal }: { onReveal: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const drawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ratio = window.devicePixelRatio || 1;
    canvas.width = 600 * ratio;
    canvas.height = 540 * ratio;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.scale(ratio, ratio);
    context.fillStyle = "#c3a065";
    context.fillRect(0, 0, 600, 540);
    context.fillStyle = "rgba(255,255,255,.3)";
    for (let i = 0; i < 110; i++) context.fillRect((i * 83) % 600, (i * 47) % 540, 2, 2);
    context.fillStyle = "#fffaf0";
    context.font = "600 22px DM Sans";
    context.textAlign = "center";
    context.fillText("SCRATCH TO REVEAL", 300, 260);
    context.font = "14px DM Sans";
    context.fillText("a date close to our hearts", 300, 290);
  }, []);

  const scratch = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const rect = canvas.getBoundingClientRect();
    const context = canvas.getContext("2d");
    if (!context) return;
    const x = (clientX - rect.left) * (600 / rect.width);
    const y = (clientY - rect.top) * (540 / rect.height);
    context.globalCompositeOperation = "destination-out";
    context.beginPath();
    context.arc(x, y, 34, 0, Math.PI * 2);
    context.fill();
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    for (let i = 3; i < pixels.length; i += 80) if (pixels[i] === 0) cleared++;
    if (cleared / (pixels.length / 80) > 0.34) {
      setRevealed(true);
      onReveal();
      setCelebrate(true);
      window.setTimeout(() => setCelebrate(false), 4500);
    }
  }, [onReveal, revealed]);

  return (
    <div className="relative mx-auto mt-9 max-w-xl">
      <svg aria-hidden="true" className="absolute size-0">
        <defs>
          <clipPath id="scratch-heart-clip" clipPathUnits="objectBoundingBox">
            <path d="M .5 .96 C .43 .88 .06 .64 .025 .43 C -.01 .2 .12 .05 .3 .05 C .4 .05 .47 .1 .5 .2 C .53 .1 .6 .05 .7 .05 C .88 .05 1.01 .2 .975 .43 C .94 .64 .57 .88 .5 .96 Z" />
          </clipPath>
        </defs>
      </svg>
      {celebrate && <Confetti />}
      <div className="scratch-heart relative mx-auto aspect-[10/9] w-[min(92vw,520px)] overflow-hidden border border-gold/30 bg-card">
        {revealed && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-5 animate-in fade-in duration-700">
            <p className="text-xs font-semibold uppercase tracking-[.25em] text-primary">Our engagement</p>
            <p className="font-display mt-3 text-4xl sm:text-5xl">16 October 2026</p>
            <p className="mt-2 text-muted-foreground">11 AM onwards</p>
          </div>
        )}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 h-full w-full touch-none transition-opacity duration-700 ${revealed ? "pointer-events-none opacity-0" : "cursor-crosshair"}`}
          onPointerDown={(event) => { drawing.current = true; event.currentTarget.setPointerCapture(event.pointerId); scratch(event.clientX, event.clientY); }}
          onPointerMove={(event) => { if (drawing.current) scratch(event.clientX, event.clientY); }}
          onPointerUp={() => { drawing.current = false; }}
        />
      </div>
      {revealed && <Countdown />}
    </div>
  );
}

function Countdown() {
  const calculate = () => Math.max(0, EVENT_DATE.getTime() - Date.now());
  const [remaining, setRemaining] = useState(calculate);
  useEffect(() => { const timer = window.setInterval(() => setRemaining(calculate()), 1000); return () => window.clearInterval(timer); }, []);
  const units = [
    [Math.floor(remaining / 86400000), "Days"],
    [Math.floor(remaining / 3600000) % 24, "Hours"],
    [Math.floor(remaining / 60000) % 60, "Minutes"],
    [Math.floor(remaining / 1000) % 60, "Seconds"],
  ];
    return <div className="mt-7 grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-bottom-3 duration-700 min-[380px]:grid-cols-4">{units.map(([value, label]) => <div key={label} className="min-w-0 rounded-md bg-card px-1 py-4 shadow-sm"><p className="font-display text-2xl text-primary sm:text-3xl">{String(value).padStart(2, "0")}</p><p className="mt-1 truncate text-[10px] uppercase tracking-[.12em] text-muted-foreground sm:text-xs">{label}</p></div>)}</div>;
}

function FallingPetals() {
  return <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden="true">{Array.from({ length: 13 }, (_, index) => <span key={index} className="petal-fall absolute -top-5 h-3 w-2 rounded-[80%_20%_70%_30%] bg-petal/55" style={{ left: `${(index * 17) % 100}%`, "--speed": `${7 + (index % 5)}s`, "--delay": `${-(index % 7)}s` } as React.CSSProperties} />)}</div>;
}

function Confetti() {
  return <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">{Array.from({ length: 52 }, (_, index) => <span key={index} className={`confetti-fall absolute -top-5 h-3 w-2 ${index % 3 === 0 ? "bg-primary" : index % 3 === 1 ? "bg-gold" : "bg-sage"}`} style={{ left: `${(index * 37) % 100}%`, "--duration": `${2.4 + (index % 12) / 7}s`, "--drift": `${(index % 2 ? 1 : -1) * (20 + index % 50)}px` } as React.CSSProperties} />)}</div>;
}