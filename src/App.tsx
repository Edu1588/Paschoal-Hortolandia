import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { z } from "zod";
import { ArrowUp, ExternalLink, Instagram, Play, Menu, X } from "lucide-react";
import { AnimatedButton } from "@/src/components/AnimatedButton";
import { DemoOne } from "@/src/components/ui/demo";

import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";

import { supabase } from "@/src/integrations/supabase/client";
import CityRadar from "./components/CityRadar";

export default function App() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      const gsap = gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      
      ScrollTrigger.clearScrollMemory("manual");
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;

      ctx = gsap.context(() => {
        gsap.from("[data-hero-line]", {
          yPercent: 110,
          opacity: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.12,
          delay: 0.2,
        });
        gsap.from("[data-hero-sub]", {
          y: 24,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          delay: 0.6,
        });
        gsap.from("[data-hero-meta]", {
          y: 16,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.9,
        });

        gsap.to("[data-hero-bg]", {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-hero]",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to("[data-hero-fg]", {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-hero]",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-timeline-row]").forEach((row) => {
          gsap.from(row.querySelectorAll("[data-timeline-year]"), {
            x: -20,
            opacity: 0,
            duration: 0.9,
            ease: "expo.out",
            scrollTrigger: { trigger: row, start: "top 80%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-gallery-item]").forEach((el, i) => {
          gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: "expo.out",
            delay: i * 0.08,
            scrollTrigger: { trigger: "[data-gallery]", start: "top 75%", once: true },
          });
        });

        gsap.from("[data-book-cover]", {
          y: 60,
          rotate: -3,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-book]", start: "top 70%", once: true },
        });

        gsap.utils.toArray<HTMLElement>("[data-stat]").forEach((el) => {
          gsap.from(el, {
            y: 30,
            opacity: 0,
            duration: 0.9,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        });
      }, rootRef);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <main ref={rootRef} className="relative bg-off-white text-ink font-body overflow-x-clip">
      <Nav />
      <Hero />
      <Marquee />
      <Historia />
      <CityRadar />
      <Stats />
      <Trajetoria />
      <DemoOne />
      <InstagramCTA />
      <VideoSection />
      <Principios />
      <HortolandiaSempreProject />
      <Book />
      <Gallery />
      <Depoimentos />
      <LeadForm />
      <NoticiasMidia />
      <Footer />
      <FloatingActionButtons />
    </main>
  );
}

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-off-white/85 backdrop-blur-md border-b border-ink/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <span className="font-display font-semibold text-xl tracking-tight text-deep-green">
            PASCHOAL
          </span>
          <span className="hidden sm:inline-block h-3 w-px bg-ink/15" />
          <span className="hidden sm:inline-block text-[10px] font-medium tracking-[0.18em] uppercase text-horto-orange">
            Hortolândia · SP
          </span>
        </a>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-7">
          <a href="#historia" className="text-sm font-medium hover:text-inst-green transition-colors">
            História
          </a>
          <a href="#trajetoria" className="text-sm font-medium hover:text-inst-green transition-colors">
            Trajetória
          </a>
          <a href="#principios" className="text-sm font-medium hover:text-inst-green transition-colors">
            Princípios
          </a>
          <a href="#livro" className="text-sm font-medium hover:text-inst-green transition-colors">
            O Livro
          </a>
          <a href="#radar" className="text-sm font-medium hover:text-inst-green transition-colors">
            Radar da Cidade
          </a>
          <AnimatedButton
            href="#participe"
            color="#2EFF00"
            textColor="#000000"
            hoverText="#0F172A"
            className="!py-2.5 !px-6 !text-[10px] animate-pulse-glow"
          >
            Participe
          </AnimatedButton>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-deep-green hover:bg-ink/5 rounded-md transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-off-white border-b border-ink/5 shadow-lg flex flex-col py-4 px-6 space-y-4">
          <a href="#historia" onClick={() => setIsOpen(false)} className="text-base font-medium text-deep-green hover:text-inst-green transition-colors">
            História
          </a>
          <a href="#trajetoria" onClick={() => setIsOpen(false)} className="text-base font-medium text-deep-green hover:text-inst-green transition-colors">
            Trajetória
          </a>
          <a href="#principios" onClick={() => setIsOpen(false)} className="text-base font-medium text-deep-green hover:text-inst-green transition-colors">
            Princípios
          </a>
          <a href="#livro" onClick={() => setIsOpen(false)} className="text-base font-medium text-deep-green hover:text-inst-green transition-colors">
            O Livro
          </a>
          <a href="#radar" onClick={() => setIsOpen(false)} className="text-base font-medium text-deep-green hover:text-inst-green transition-colors">
            Radar da Cidade
          </a>
          <div className="pt-2">
            <AnimatedButton
              href="#participe"
              color="#2EFF00"
              textColor="#000000"
              hoverText="#0F172A"
              className="!py-2.5 !px-6 !text-[10px] w-full max-w-xs animate-pulse-glow"
              onClick={() => setIsOpen(false)}
            >
              Participe
            </AnimatedButton>
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <header
      id="top"
      data-hero
      className="relative min-h-screen flex flex-col justify-end p-6 md:p-16 lg:p-20 pt-24 overflow-hidden text-center md:text-left"
    >
      <div className="absolute inset-0 z-0">
        <img
          data-hero-bg
          src="https://res.cloudinary.com/djw0tqmiw/image/upload/v1782169933/gtztuwy7nhhqx5win37d.png"
          alt="Hortolândia - BG"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <img
          data-hero-fg
          src="https://res.cloudinary.com/djw0tqmiw/image/upload/v1782169933/sewfqrvh7u6y7m9e4jbr.png"
          alt="Paschoal em Hortolândia"
          className="absolute right-0 bottom-0 h-[85%] md:h-[95%] lg:h-[105%] w-auto max-w-[150%] sm:max-w-[120%] md:max-w-[90%] object-contain object-bottom md:object-right-bottom pointer-events-none origin-bottom"
        />
        <div className="absolute inset-y-0 left-0 w-full md:w-[60%] lg:w-[65%] bg-gradient-to-r from-deep-green via-deep-green/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-deep-green/90 via-deep-green/40 to-transparent md:hidden" />
      </div>

      <div className="relative z-10 max-w-5xl">
        <div className="overflow-hidden mb-6 flex justify-center md:justify-start">
          <span
            data-hero-meta
            className="inline-flex items-center gap-3 text-warm-cream/85 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em]"
          >
            <span className="hidden md:inline-block h-px w-8 bg-horto-orange" />
            Trabalho, honestidade e perseverança
          </span>
        </div>

        <h1 className="font-display font-semibold text-warm-cream leading-[0.95] tracking-tight text-balance">
          <span className="block overflow-hidden">
            <span data-hero-line className="block text-4xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              Minha história se confunde
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-hero-line className="block text-4xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              com a própria história de{" "}
              <em className="not-italic text-horto-orange font-display italic">Hortolândia</em>.
            </span>
          </span>
        </h1>

        <p
          data-hero-sub
          className="mt-8 max-w-2xl mx-auto md:mx-0 text-warm-cream/85 text-base md:text-xl leading-relaxed font-light"
        >
          Economista, pioneiro da emancipação, primeiro Secretário Municipal de Finanças e
          Planejamento, ex-Vereador e Presidente da Câmara. Mais de quatro décadas dedicadas
          a construir uma Hortolândia mais justa, ética e humana.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
          <AnimatedButton
            href="#participe"
            color="#2EFF00"
            textColor="#000000"
            hoverText="#0F172A"
            className="animate-pulse-glow"
          >
            Some-se à causa
          </AnimatedButton>
          <AnimatedButton
            href="#historia"
            color="var(--color-warm-cream)"
            textColor="var(--color-deep-green)"
          >
            Ler a história
          </AnimatedButton>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row flex-wrap items-center justify-center md:justify-start gap-x-12 gap-y-4 text-warm-cream/70 text-xs uppercase tracking-[0.2em]">
          <span data-hero-meta>📍 Hortolândia — SP</span>
          <span data-hero-meta>📘 Autor · Hortolândia Sempre</span>
          <span data-hero-meta>💚 Pioneiro da emancipação</span>
        </div>
      </div>
    </header>
  );
}

function Marquee() {
  const words =
    "EMANCIPAÇÃO · ÉTICA · TRANSPARÊNCIA · HORTOLÂNDIA · MEMÓRIA · TRABALHO · RAÍZES · FUTURO · ";
  return (
    <section aria-hidden className="bg-deep-green py-7 border-y border-warm-cream/10 overflow-hidden">
      <div className="animate-marquee flex whitespace-nowrap hover:[animation-play-state:paused]">
        <span className="font-display font-semibold text-warm-cream/40 text-2xl md:text-4xl tracking-[0.15em] pr-12">
          {words.repeat(4)}
        </span>
        <span className="font-display font-semibold text-warm-cream/40 text-2xl md:text-4xl tracking-[0.15em] pr-12">
          {words.repeat(4)}
        </span>
      </div>
    </section>
  );
}

function VideoSection() {
  return (
    <section className="bg-off-white py-24 lg:py-32 px-6 md:px-16 lg:px-20 border-t border-ink/5 reveal opacity-0 translate-y-6">
      <div className="max-w-[1000px] mx-auto text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-inst-green">
          A Voz da Experiência
        </span>
        <h2 className="mt-4 font-display font-semibold text-4xl lg:text-5xl leading-[1.05] text-deep-green mb-12">
          Assista à Nossa <em className="italic">Mensagem</em>
        </h2>
        <div className="relative aspect-video bg-ink/5 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-ink/10">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/RO7nln7Une0"
            title="Video Paschoal"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}

const historiaParagrafos = [
  "Nasci no interior de Minas Gerais, em uma família que nunca teve luxo, mas que nunca abriu mão do trabalho e da honestidade. Em casa, aprendi mais observando do que ouvindo conselhos. Via meus pais enfrentarem as dificuldades sem reclamar e seguirem em frente, dia após dia.",
  "Quando cheguei a Hortolândia, a cidade era muito diferente da que conhecemos hoje. Quem viveu aquela época certamente se lembra das ruas de terra, dos problemas de infraestrutura e das inúmeras necessidades que existiam em praticamente todos os bairros.",
  "Eu acompanhei esse crescimento de perto.",
  "Participei da emancipação da cidade e vi nascer uma nova etapa para a população. Não foi um caminho simples. Muitas decisões precisaram ser tomadas, muitos desafios precisaram ser enfrentados e havia um enorme trabalho pela frente.",
  "Com o passar dos anos, tive a responsabilidade de ocupar cargos importantes na administração pública. Atuei como primeiro Secretário Municipal de Finanças e Planejamento, fui Vereador e também Presidente da Câmara Municipal.",
  "Sempre procurei exercer essas funções da mesma forma que conduzi minha vida: com responsabilidade, respeito às pessoas e cuidado com os recursos públicos.",
  "Hoje, quando olho para Hortolândia, não enxergo apenas uma cidade que cresceu. Vejo histórias, lembranças e pessoas que fizeram parte da minha caminhada. Vejo uma cidade que ajudou a construir minha trajetória ao mesmo tempo em que eu procurava contribuir para a construção dela."
];

function Historia() {
  return (
    <section
      id="historia"
      className="py-24 lg:py-32 px-6 md:px-16 lg:px-20 border-t border-ink/10 reveal opacity-0 translate-y-6"
    >
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-12 lg:gap-20">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-inst-green">
              Minha História
            </span>
            <h2 className="mt-4 font-display font-semibold text-4xl lg:text-5xl leading-[1.05] text-deep-green text-balance">
              De Minas Gerais para o coração de <em className="italic">Hortolândia</em>.
            </h2>
            <p className="mt-6 text-ink/70 leading-relaxed max-w-sm">
              Uma vida construída sobre trabalho, fé e amor por esta cidade — desde antes
              dela se tornar município.
            </p>
            <div className="mt-8 border-l-2 border-[var(--color-mdb-red-light)] pl-5">
              <p className="font-display italic text-lg text-deep-green leading-snug">
                “A política não pode ser um instrumento de poder pessoal, mas sim uma
                ferramenta de transformação social.”
              </p>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 space-y-7 text-ink/80 leading-[1.85] text-lg">
          {historiaParagrafos.map((p, i) => (
            <p key={i} className={i === 0 ? "first-letter:font-display first-letter:text-7xl first-letter:font-semibold first-letter:text-horto-orange first-letter:mr-3 first-letter:float-left first-letter:leading-[0.85]" : ""}>
              {p}
            </p>
          ))}
          <div className="pt-8 border-t border-ink/10 grid sm:grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <strong className="block text-[10px] uppercase tracking-widest text-horto-orange mb-1">Formação</strong>
              <span className="text-sm font-semibold text-deep-green">Economista</span>
            </div>
            <div>
              <strong className="block text-[10px] uppercase tracking-widest text-horto-orange mb-1">Experiência</strong>
              <span className="text-sm font-semibold text-deep-green pl-2 relative before:content-[''] before:absolute before:left-0 before:top-2 before:-mt-1 before:w-1 before:h-1 before:bg-horto-orange before:rounded-full">Mais de 40 anos de atuação profissional</span>
              <br/>
              <span className="text-sm font-semibold text-deep-green pl-2 relative before:content-[''] before:absolute before:left-0 before:top-2 before:-mt-1 before:w-1 before:h-1 before:bg-horto-orange before:rounded-full mt-1 inline-block">1º Sec. Municipal de Finanças de Hortolândia</span>
              <br/>
              <span className="text-sm font-semibold text-deep-green pl-2 relative before:content-[''] before:absolute before:left-0 before:top-2 before:-mt-1 before:w-1 before:h-1 before:bg-horto-orange before:rounded-full mt-1 inline-block">Ex-Vereador e Ex-Presidente da Câmara</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const stats = [
  { value: "40+", label: "Anos como economista" },
  { value: "1º", label: "Secretário de Finanças de Hortolândia" },
  { value: "1991", label: "Pioneiro da emancipação" },
  { value: "∞", label: "Compromisso com a cidade" },
];

function Stats() {
  return (
    <section className="bg-deep-green text-warm-cream py-20 px-6 md:px-16 lg:px-20">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
        {stats.map((s) => (
          <div key={s.label} data-stat className="border-t border-warm-cream/15 pt-6">
            <div className="font-display font-semibold text-5xl md:text-6xl text-horto-orange leading-none">
              {s.value}
            </div>
            <div className="mt-4 text-xs uppercase tracking-[0.22em] text-warm-cream/75 leading-snug">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const timeline = [
  {
    year: "Raízes",
    title: "Origem mineira, alma hortolandense",
    body:
      "Filho de família humilde do interior de Minas Gerais, aprendi cedo que trabalho, honestidade e perseverança constroem uma vida digna.",
  },
  {
    year: "Formação",
    title: "Economista por vocação",
    body:
      "Formado em Economia com especialização em Economia Brasileira, construí minha carreira acreditando que a gestão pública deve estar a serviço das pessoas.",
  },
  {
    year: "1991",
    title: "Emancipação de Hortolândia",
    body:
      "Participei ativamente do movimento pela emancipação. Acompanhei desde os primeiros dias a construção da cidade que hoje é uma das mais importantes da RMC.",
  },
  {
    year: "Gestão",
    title: "1º Secretário de Finanças e Planejamento",
    body:
      "Tive a honra de organizar as finanças do novo município, com responsabilidade, ética e respeito absoluto ao dinheiro público.",
  },
  {
    year: "Câmara",
    title: "Vereador e Presidente da Câmara",
    body:
      "Ajudei a construir escolas, fortalecer a saúde pública e planejar o crescimento da cidade — sempre com o interesse coletivo acima de qualquer interesse pessoal.",
  },
  {
    year: "Hoje",
    title: "Hortolândia Sempre",
    body:
      "Autor de Hortolândia Sempre, sigo trabalhando pela cidade, pela Região Metropolitana de Campinas e pelo Brasil, defendendo uma política ética e transparente.",
  },
];

const mockImages = [
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544830251-1f3e74bd0316?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560439514-4e9645039924?q=80&w=400&auto=format&fit=crop",
];

const TimelineItem: React.FC<{ item: typeof timeline[0] }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li
      data-timeline-row
      className="flex flex-col md:flex-row gap-6 md:gap-10 border-t border-ink/10 pt-10 first:border-t-0 first:pt-0"
    >
      <span
        data-timeline-year
        className="font-sans font-light text-xl md:text-2xl text-horto-orange shrink-0 md:w-16 [writing-mode:vertical-rl] uppercase tracking-widest text-center"
      >
        {item.year}
      </span>
      <div className="flex-1 w-full min-w-0">
        <h3 className="text-base md:text-lg font-bold uppercase tracking-[0.18em] text-deep-green mb-3">
          {item.title}
        </h3>
        <p className="text-ink/75 leading-relaxed max-w-[60ch]">{item.body}</p>
        
        <div className="mt-6 flex items-start p-1 -ml-1">
          <AnimatedButton
            type="button"
            color="var(--color-horto-orange)"
            onClick={() => setIsOpen(!isOpen)}
            className="!px-6 !py-3 !text-[10px]"
          >
            {isOpen ? "Fechar Galeria" : "Galeria"}
          </AnimatedButton>
        </div>

        {isOpen && (
          <div className="mt-8 flex gap-4 overflow-x-auto pb-4 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {mockImages.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="h-48 w-72 object-cover rounded shadow-lg snap-center shrink-0"
              />
            ))}
          </div>
        )}
      </div>
    </li>
  );
}

function Trajetoria() {
  return (
    <section
      id="trajetoria"
      className="py-24 lg:py-32 px-6 md:px-16 lg:px-20 border-t border-ink/10 reveal opacity-0 translate-y-6"
    >
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-12 lg:gap-20">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-inst-green">
              Trajetória
            </span>
            <h2 className="mt-4 font-display font-semibold text-4xl lg:text-5xl leading-[1.05] text-deep-green text-balance">
              Uma vida dedicada à <em className="italic font-display">nossa cidade</em>.
            </h2>
            <p className="mt-6 text-ink/70 leading-relaxed max-w-sm">
              Mais de quatro décadas servindo Hortolândia — antes mesmo dela se chamar assim.
            </p>
          </div>
        </div>

        <ol className="md:col-span-8 space-y-16 md:space-y-20">
          {timeline.map((item) => (
            <TimelineItem key={item.title} item={item} />
          ))}
        </ol>
      </div>
    </section>
  );
}

const principios = [
  {
    n: "01",
    titulo: "Ética e transparência",
    texto:
      "Acredito que o dinheiro público pertence ao povo e deve ser administrado com responsabilidade absoluta.",
  },
  {
    n: "02",
    titulo: "Trabalho e perseverança",
    texto:
      "Valores aprendidos em casa, que moldaram minha trajetória pessoal, profissional e pública.",
  },
  {
    n: "03",
    titulo: "Serviço acima de cargo",
    texto:
      "A verdadeira grandeza não está nos cargos ocupados, mas na capacidade de servir o próximo.",
  },
  {
    n: "04",
    titulo: "Interesse coletivo",
    texto:
      "O bem comum deve estar sempre acima de qualquer interesse pessoal ou partidário.",
  },
];

function Principios() {
  return (
    <section
      id="principios"
      className="py-24 lg:py-32 px-6 md:px-16 lg:px-20 bg-warm-cream/40 reveal opacity-0 translate-y-6"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-inst-green">
            Princípios
          </span>
          <h2 className="mt-4 font-display font-semibold text-4xl lg:text-5xl leading-[1.05] text-deep-green text-balance">
            No que <em className="italic">acredito</em>.
          </h2>
          <p className="mt-6 text-ink/70 leading-relaxed text-lg">
            Os alicerces que orientam cada decisão, cada conversa, cada caminhada pelas
            ruas de Hortolândia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {principios.map((p) => (
            <article
              key={p.n}
              className="bg-off-white border border-ink/10 p-8 lg:p-10 hover:border-[var(--color-mdb-red-light)] transition-colors group"
            >
              <div className="flex items-baseline justify-between mb-6">
                <span className="font-display italic text-5xl text-horto-orange/30 group-hover:text-horto-orange transition-colors">
                  {p.n}
                </span>
                <span className="h-px w-16 bg-ink/10" />
              </div>
              <h3 className="font-display font-semibold text-2xl text-deep-green mb-3">
                {p.titulo}
              </h3>
              <p className="text-ink/70 leading-relaxed">{p.texto}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HortolandiaSempreProject() {
  return (
    <section id="projeto" className="py-24 lg:py-32 px-6 md:px-16 lg:px-20 border-t border-ink/5 reveal opacity-0 translate-y-6">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-inst-green">
            O Projeto
          </span>
          <h2 className="mt-4 font-display font-semibold text-4xl lg:text-5xl leading-[1.05] text-deep-green text-balance">
            Hortolândia <em className="italic">Sempre</em>
          </h2>
          <div className="mt-8 space-y-6 text-ink/75 leading-relaxed text-lg">
            <p>
              O projeto Hortolândia Sempre nasceu do desejo de preservar a nossa história, valorizar os personagens que construíram nossa cidade e manter um canal permanente de relacionamento com a população.
            </p>
            <p>
              Acredito que só podemos projetar um futuro brilhante quando conhecemos e respeitamos o nosso passado. Este espaço digital foi criado não apenas para relembrar o movimento de emancipação, mas para acompanharmos juntos os desafios atuais de Hortolândia.
            </p>
            <p className="font-semibold text-deep-green">
              Meu propósito é fortalecer a participação cidadã, garantindo que as futuras gerações conheçam o esforço feito para transformar aquele antigo distrito em uma potência metropolitana.
            </p>
          </div>
        </div>
        <div className="bg-warm-cream/50 p-10 md:p-14 border border-ink/10 relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-horto-orange/10 rounded-bl-full" />
          <h3 className="font-display font-semibold text-2xl text-deep-green mb-6">Participe do nosso propósito</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <span className="shrink-0 w-8 h-8 rounded-full bg-deep-green text-warm-cream flex items-center justify-center font-bold text-xs">1</span>
              <div>
                <strong className="block text-sm uppercase tracking-wider text-deep-green mb-1">Preservação da Memória</strong>
                <span className="text-sm text-ink/75 block">Compartilhando histórias que construíram nossa cidade.</span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="shrink-0 w-8 h-8 rounded-full bg-deep-green text-warm-cream flex items-center justify-center font-bold text-xs">2</span>
              <div>
                <strong className="block text-sm uppercase tracking-wider text-deep-green mb-1">Cidadania Ativa</strong>
                <span className="text-sm text-ink/75 block">Debatendo os desafios e as melhorias para o amanhã.</span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="shrink-0 w-8 h-8 rounded-full bg-deep-green text-warm-cream flex items-center justify-center font-bold text-xs">3</span>
              <div>
                <strong className="block text-sm uppercase tracking-wider text-deep-green mb-1">Boletim Informativo</strong>
                <span className="text-sm text-ink/75 block">Receba comunicados e matérias sobre os próximos passos.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Book() {
  return (
    <section
      id="livro"
      data-book
      className="relative bg-deep-green text-warm-cream py-28 lg:py-40 px-6 md:px-16 lg:px-20 overflow-hidden"
    >
      <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-horto-orange/10 blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-16 lg:gap-24 items-center relative">
        <div data-book-cover className="order-2 md:order-1">
          <div className="relative aspect-[4/5] max-w-md mx-auto">
            <div className="absolute inset-0 translate-x-3 translate-y-3 bg-horto-orange/40" />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1_7FOKwvJjwv9zi8IxmEF5Ic1ggYRvgO6HeHj7RMCeg&s"
              alt="Capa do livro Hortolândia Sempre, por Paschoal"
              loading="lazy"
              width={1024}
              height={1280}
              className="relative w-full h-full object-cover shadow-2xl"
            />
          </div>
        </div>

        <div className="order-1 md:order-2 space-y-8">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-inst-green">
            Obra do autor
          </span>
          <h2 className="font-display font-semibold text-4xl lg:text-6xl leading-[1.05] text-balance">
            “Hortolândia <em className="italic">Sempre</em>.”
          </h2>
          <p className="text-lg lg:text-xl text-warm-cream/85 leading-relaxed font-light max-w-xl">
            Mais que um livro, um documento histórico. Em suas páginas, resgato as origens,
            os personagens e os marcos que transformaram nossa cidade na potência que é hoje.
          </p>

          <ul className="space-y-3 text-warm-cream/80">
            <li className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-horto-orange" />
              Relatos inéditos do movimento de emancipação
            </li>
            <li className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-horto-orange" />
              Fotografias históricas restauradas
            </li>
            <li className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-horto-orange" />
              Vozes de quem ajudou a construir a cidade
            </li>
          </ul>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <AnimatedButton
              href="#participe"
              color="#2EFF00"
              textColor="#000000"
              hoverText="#0F172A"
            >
              Quero saber mais
            </AnimatedButton>
          </div>
        </div>
      </div>
    </section>
  );
}

const moments = [
  { src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop", alt: "Paschoal em conversa com moradores no parque", caption: "Atuação comunitária" },
  { src: "https://images.unsplash.com/photo-1544830251-1f3e74bd0316?q=80&w=800&auto=format&fit=crop", alt: "Paschoal em evento de emancipação", caption: "Emancipação" },
  { src: "https://images.unsplash.com/photo-1560439514-4e9645039924?q=80&w=800&auto=format&fit=crop", alt: "Paschoal estudando mapas históricos da cidade", caption: "História da Cidade" },
  { src: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=800&auto=format&fit=crop", alt: "Hortolândia ao entardecer vista do mirante", caption: "Fotos Atuais" },
];

function Gallery() {
  return (
    <section id="momentos" data-gallery className="py-24 lg:py-32 px-6 md:px-16 lg:px-20 reveal opacity-0 translate-y-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-inst-green">
            Momentos
          </span>
          <h2 className="mt-4 font-display font-semibold text-4xl lg:text-5xl leading-[1.05] text-deep-green text-balance">
            Caminhando pela <em className="italic">nossa terra</em>.
          </h2>
          <p className="mt-5 text-ink/65 leading-relaxed">
            Momentos reais de quem vive a cidade — todos os dias, com a mesma paixão.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {moments.map((m) => (
            <figure
              key={m.caption}
              data-gallery-item
              className="group relative aspect-[3/4] overflow-hidden bg-warm-cream"
            >
              <img
                src={m.src}
                alt={m.alt}
                loading="lazy"
                width={800}
                height={1024}
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-green/80 via-deep-green/10 to-transparent opacity-90" />
              <figcaption className="absolute bottom-4 left-4 right-4 text-[10px] md:text-xs uppercase tracking-[0.2em] font-semibold text-warm-cream">
                {m.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

const depoimentos = [
  {
    quote:
      "O Paschoal não é apenas alguém que conhece a história de Hortolândia; ele é parte fundamental dela. Sua dedicação em preservar nossas raízes é inspiradora.",
    name: "Dona Maria",
    role: "Moradora do Jd. Amanda",
  },
  {
    quote:
      "Ler o livro dele me fez ter orgulho de onde nasci. Ele transmite o amor que sente por cada rua deste lugar.",
    name: "Ricardo Silva",
    role: "Professor e historiador local",
  },
];

function Depoimentos() {
  return (
    <section className="bg-warm-cream/40 py-24 lg:py-32 px-6 md:px-16 lg:px-20 reveal opacity-0 translate-y-6">
      <div className="max-w-4xl mx-auto space-y-14">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-inst-green">
            Reconhecimentos
          </span>
          <h2 className="mt-4 font-display font-semibold text-3xl md:text-5xl leading-tight text-deep-green text-balance">
            Vozes da cidade
          </h2>
        </div>
        {depoimentos.map((d) => (
          <blockquote key={d.name} className="border-l-4 border-[var(--color-mdb-red-light)] pl-8 md:pl-10">
            <p className="font-display italic text-2xl md:text-3xl leading-[1.3] text-deep-green text-balance">
              “{d.quote}”
            </p>
            <footer className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-ink/70">
              — {d.name} · <span className="text-ink/50">{d.role}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

const leadSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  telefone: z.string().trim().max(30).optional().or(z.literal("")),
  bairro: z.string().trim().max(80).optional().or(z.literal("")),
  mensagem: z.string().trim().max(1000).optional().or(z.literal("")),
});

function LeadForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const form = e.currentTarget;
    const data = {
      nome: (form.elements.namedItem("nome") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      telefone: (form.elements.namedItem("telefone") as HTMLInputElement).value,
      bairro: (form.elements.namedItem("bairro") as HTMLInputElement).value,
      mensagem: (form.elements.namedItem("mensagem") as HTMLTextAreaElement).value,
    };
    const parsed = leadSchema.safeParse(data);
    if (!parsed.success) {
      setStatus("error");
      setErrorMsg(parsed.error.issues[0]?.message ?? "Verifique os dados");
      return;
    }
    const { error } = await supabase.from("leads").insert({
      nome: parsed.data.nome,
      email: parsed.data.email,
      telefone: parsed.data.telefone || null,
      bairro: parsed.data.bairro || null,
      mensagem: parsed.data.mensagem || null,
      origem: "site",
    });
    if (error) {
      setStatus("error");
      setErrorMsg("Não foi possível enviar. Tente novamente em instantes.");
      return;
    }
    form.reset();
    setStatus("success");
  }

  return (
    <section
      id="participe"
      className="relative py-28 lg:py-40 px-6 md:px-16 lg:px-20 bg-deep-green text-warm-cream overflow-hidden reveal opacity-0 translate-y-6"
    >
      <div className="absolute -bottom-40 -left-40 w-[520px] h-[520px] rounded-full bg-horto-orange/10 blur-3xl pointer-events-none" />
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-12 lg:gap-20 relative">
        <div className="md:col-span-5">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-inst-green">
            Boletim
          </span>
          <h2 className="mt-4 font-display font-semibold text-4xl lg:text-6xl leading-[1.02] text-balance">
            Hortolândia <em className="italic">Sempre</em>.
          </h2>
          <p className="mt-6 text-warm-cream/80 leading-relaxed text-lg max-w-md">
            Assine nosso boletim informativo e receba em primeira mão conteúdos exclusivos sobre a nossa cidade.
          </p>
          <ul className="mt-10 space-y-3 text-warm-cream/75 text-sm">
            <li className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-horto-orange" />História e curiosidades</li>
            <li className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-horto-orange" />Projetos de impacto e iniciativas na comunidade</li>
            <li className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-horto-orange" />Eventos Culturais</li>
          </ul>
        </div>

        <form
          onSubmit={onSubmit}
          className="md:col-span-7 bg-warm-cream text-ink p-8 md:p-12 space-y-5"
          noValidate
        >
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Nome completo *" name="nome" required maxLength={100} />
            <Field label="E-mail *" name="email" type="email" required maxLength={255} />
            <Field label="Telefone / WhatsApp" name="telefone" maxLength={30} />
            <Field label="Bairro" name="bairro" maxLength={80} />
          </div>
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-deep-green mb-2">
              Mensagem (opcional)
            </label>
            <textarea
              name="mensagem"
              rows={4}
              maxLength={1000}
              className="w-full bg-off-white border border-ink/15 px-4 py-3 focus:outline-none focus:border-[var(--color-mdb-red-light)] text-ink font-body resize-none"
            />
          </div>

          {status === "error" && (
            <p className="text-sm text-red-700 font-medium">{errorMsg}</p>
          )}
          {status === "success" && (
            <p className="text-sm text-inst-green font-semibold uppercase tracking-[0.15em]">
              ✓ Recebemos seu contato. Obrigado por caminhar conosco!
            </p>
          )}

          <AnimatedButton
            type="submit"
            disabled={status === "loading"}
            color="var(--color-deep-green)"
            textColor="var(--color-warm-cream)"
            hoverText="var(--color-horto-orange)"
            className={status === "loading" ? "opacity-60 pointer-events-none" : ""}
          >
            {status === "loading" ? "Enviando..." : "Quero participar"}
          </AnimatedButton>
          <p className="text-[11px] text-ink/55 leading-relaxed">
            Seus dados são tratados com sigilo e usados somente para comunicação institucional.
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  maxLength,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
}) {
  return (
    <div>
      <label className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-deep-green mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        maxLength={maxLength}
        className="w-full bg-off-white border border-ink/15 px-4 py-3 focus:outline-none focus:border-[var(--color-mdb-red-light)] text-ink font-body"
      />
    </div>
  );
}

function InstagramCTA() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section className="py-24 lg:py-32 px-6 text-center bg-off-white reveal opacity-0 translate-y-6">
      <div className="max-w-2xl mx-auto mb-16">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-inst-green">
          Acompanhe a jornada
        </span>
        <h2 className="mt-5 font-display font-semibold text-4xl md:text-5xl leading-[1.02] text-deep-green text-balance">
          Siga no <em className="italic">Instagram</em>.
        </h2>
        <p className="mt-6 text-lg text-ink/65 leading-relaxed">
          Memórias, encontros e o dia a dia de quem acredita que o futuro de Hortolândia se
          constrói conhecendo o seu passado.
        </p>
      </div>

      <div className="max-w-4xl mx-auto relative">
        <div className="elfsight-app-499ae320-fdd8-447b-a2be-3e488faf59b3" data-elfsight-app-lazy></div>
        {/* Bar to hide Elfsight watermark */}
        <div className="absolute bottom-0 left-0 right-0 h-14 bg-off-white z-10"></div>
      </div>

      <div className="mt-8 relative z-20 flex justify-center">
        <AnimatedButton
          href="https://instagram.com/paschoal.hortolandia"
          target="_blank"
          rel="noreferrer"
          color="var(--color-deep-green)"
            textColor="var(--color-warm-cream)"
            hoverText="var(--color-horto-orange)"
        >
          @paschoal.hortolandia
        </AnimatedButton>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-deep-green text-warm-cream/80 py-14 px-6 md:px-16 lg:px-20">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-warm-cream/10">
        <div className="flex items-center gap-3">
          <span className="font-display font-semibold text-xl tracking-tight text-warm-cream">
            PASCHOAL
          </span>
          <span className="h-3 w-px bg-warm-cream/20" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-horto-orange">
            Hortolândia Sempre
          </span>
        </div>
        <div className="flex flex-wrap gap-6 md:gap-8 text-[10px] uppercase tracking-[0.22em] font-semibold">
          <a href="#historia" className="hover:text-horto-orange transition-colors">História</a>
          <a href="#trajetoria" className="hover:text-horto-orange transition-colors">Trajetória</a>
          <a href="#principios" className="hover:text-horto-orange transition-colors">Princípios</a>
          <a href="#livro" className="hover:text-horto-orange transition-colors">O Livro</a>
          <a href="#radar" className="hover:text-horto-orange transition-colors">Radar da Cidade</a>
          <a href="#participe" className="hover:text-horto-orange transition-colors">Participe</a>
          <a
            href="https://instagram.com/paschoal.hortolandia"
            target="_blank"
            rel="noreferrer"
            className="hover:text-horto-orange transition-colors"
          >
            Instagram
          </a>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto mt-8 flex flex-col md:flex-row justify-between text-[10px] uppercase tracking-[0.22em] text-warm-cream/40">
        <span>© {new Date().getFullYear()} Paschoal</span>
        <span className="mt-4 md:mt-0 flex gap-4">
          <span>Feito com orgulho em Hortolândia · SP</span>
          <span>
            Desenvolvido por{" "}
            <a
              href="https://www.fabricapublicidade.com.br/"
              target="_blank"
              rel="noreferrer"
              className="text-warm-cream/60 hover:text-horto-orange transition-colors"
            >
              Fábrica Publicidade & Digital
            </a>
          </span>
        </span>
      </div>
    </footer>
  );
}

function NoticiasMidia() {
  const articles = [
    {
      title: "Hortolândia aposta na memória: O papel de Paschoal na emancipação",
      source: "Página Paulista",
      date: "Maio de 2024",
      link: "#",
    },
    {
      title: "Desenvolvimento e responsabilidade social no novo ciclo da cidade",
      source: "Jornal do Município",
      date: "Março de 2024",
      link: "#",
    },
    {
      title: "Ex-presidente da Câmara lança livro detalhando os bastidores políticos",
      source: "Correio Popular",
      date: "Dezembro de 2023",
      link: "#",
    },
  ];

  return (
    <section id="noticias" className="py-24 px-6 md:px-16 lg:px-20 bg-warm-cream/30 reveal opacity-0 translate-y-6">
      <div className="max-w-[1400px] mx-auto">
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-inst-green block mb-4">
          Na Mídia
        </span>
        <h2 className="font-display font-semibold text-3xl md:text-5xl leading-tight text-deep-green mb-12">
          Notícias e <br className="hidden md:block"/> Repercussão
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <a
              key={i}
              href={article.link}
              target="_blank"
              rel="noreferrer"
              className="block group bg-off-white p-8 border border-ink/5 hover:border-[var(--color-mdb-red-light)]/40 transition-colors"
            >
              <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-widest text-ink/50 mb-6">
                <span>{article.source}</span>
                <span>{article.date}</span>
              </div>
              <h3 className="font-display font-medium text-lg leading-snug group-hover:text-inst-green transition-colors mb-6">
                {article.title}
              </h3>
              <div className="text-xs font-bold uppercase tracking-widest text-horto-orange group-hover:text-inst-green flex items-center justify-between transition-colors">
                <span>Ler matéria</span>
                <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function FloatingActionButtons() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex flex-col gap-3 transition-opacity duration-300 ${visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
      <a
        href="https://wa.me/5519999999999"
        target="_blank"
        rel="noreferrer"
        className="bg-[#00e676] text-white w-12 h-12 flex items-center justify-center rounded-full hover:-translate-y-1 hover:bg-[#00c853] transition-all shadow-xl"
        aria-label="WhatsApp Paschoal"
      >
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>
      <a
        href="https://instagram.com/paschoal.hortolandia"
        target="_blank"
        rel="noreferrer"
        className="bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white w-12 h-12 flex items-center justify-center rounded-full hover:-translate-y-1 transition-all shadow-xl"
        aria-label="Instagram Paschoal"
      >
        <Instagram className="w-5 h-5" />
      </a>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="bg-horto-orange text-warm-cream w-12 h-12 flex items-center justify-center rounded-full hover:-translate-y-1 hover:bg-inst-green transition-all shadow-xl mt-2"
        aria-label="Voltar ao topo"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
}
