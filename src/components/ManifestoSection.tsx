import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const manifestoContent = [
  {
    title: "Gestão e prioridades",
    text: "“O maior desafio do município não é a falta de recursos, mas a definição de prioridades e a eficiência na administração do dinheiro público. Hortolândia é uma das cidades mais prósperas do Estado de São Paulo. Seu orçamento anual aproxima-se de R$ 2 bilhões, um volume de recursos que poucos municípios brasileiros possuem.”",
    image: "https://hortonews.com.br/images/noticias/2547/3d7718d0abbc8433d6a4364e1eb8d0e7.JPG"
  },
  {
    title: "A riqueza que não chega à população",
    text: "“Hortolândia é uma das cidades mais prósperas do Estado de São Paulo. Hoje, possui um orçamento próximo de R$ 2 bilhões por ano, um privilégio que poucos municípios brasileiros possuem. Esse recurso poderia transformar nossa cidade em referência nacional em saúde, educação, segurança, mobilidade urbana, geração de empregos, esporte, cultura e qualidade de vida. Infelizmente, essa riqueza ainda não chegou à vida de muitas famílias.”",
    image: "https://ichef.bbci.co.uk/ace/ws/640/amz/worldservice/live/assets/images/2014/10/08/141008012925_hortolandia_624x351_bbc.jpg.webp"
  },
  {
    title: "Impacto do desperdício público",
    text: "“Cada real desperdiçado representa menos médicos, menos medicamentos, menos vagas em creches, menos segurança, menos infraestrutura, menos oportunidades para nossos jovens e menos qualidade de vida para milhares de famílias.”",
    image: "https://ambiental.sc/wp-content/uploads/2025/10/os-perigos-do-descarte-incorreto-de-residuos-para-a-saude-publica.jpg"
  },
  {
    title: "O dinheiro público pertence ao povo",
    text: "“O dinheiro público não pertence ao prefeito, ao vice-prefeito ou a qualquer agente político. Esse dinheiro pertence ao povo e deve ser administrado exclusivamente em benefício da sociedade.”",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1600&auto=format&fit=crop"
  },
  {
    title: "Responsabilidade e esperança",
    text: "“Sempre acreditei que administrar recursos públicos é, antes de tudo, administrar a esperança das pessoas. Por trás de cada real arrecadado existem pessoas, famílias, sonhos e esperanças.”",
    image: "https://cdn.mindminers.com/blog/uploads/2024/01/pessoas-energia-renov-vel.png"
  }
];

export function ManifestoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Fade background from 0 to 0.08
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);

  // Main title animation
  // Phrase: "A CIDADE PERTENCE AO POVO"
  const phrase = "A CIDADE\nPERTENCE AO POVO";
  const letters = phrase.split("");

  // After fading in letters, we scale down and move to footer
  const titleScale = useTransform(scrollYProgress, [0.18, 0.28], [1, 0.15]); // scale down to 15%
  const titleY = useTransform(scrollYProgress, [0.18, 0.28], ["0vh", "45vh"]);
  const titleOpacity = useTransform(scrollYProgress, [0.25, 0.28], [1, 0]);

  // Footer text fades in exactly as the main title fades out
  const footerOpacity = useTransform(scrollYProgress, [0.27, 0.29], [0, 1]);

  return (
    <section ref={containerRef} className="relative h-[750vh] -mt-[100vh] z-40" id="manifesto">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center pointer-events-none">
        
        {/* Fundo preto suave que sobrepõe a seção anterior */}
        <motion.div 
          className="absolute inset-0 bg-black z-0"
          style={{ opacity: backgroundOpacity }}
        />

        {/* Intro text animation */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-20"
          style={{ scale: titleScale, y: titleY, opacity: titleOpacity }}
        >
          <h2 className="text-4xl md:text-7xl font-body uppercase tracking-[0.2em] text-white font-semibold text-center leading-[1.2]">
            {letters.map((letter, i) => {
              if (letter === "\n") {
                return <br key={i} />;
              }
              // Stagger letter fade in between 0.08 and 0.16
              const start = 0.08 + (i * 0.003);
              const end = start + 0.03;
              const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
              const y = useTransform(scrollYProgress, [start, end], [20, 0]);
              
              return (
                <motion.span 
                  key={i} 
                  style={{ opacity, y, display: "inline-block" }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              );
            })}
          </h2>
        </motion.div>
        
        {/* Content containers */}
        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 py-24 flex items-center">
          {manifestoContent.map((item, index) => {
            // Intro takes up to 0.28. Remaining 0.72 divided by 5 = 0.144 per item
            const start = 0.28 + (index * 0.144);
            const fadeUpEnd = start + 0.04;
            const fadeOutStart = start + 0.11;
            const end = start + 0.144;

            const opacity = useTransform(
              scrollYProgress,
              [start, fadeUpEnd, fadeOutStart, end],
              [0, 1, 1, index === 4 ? 1 : 0]
            );
            
            const y = useTransform(
              scrollYProgress,
              [start, fadeUpEnd, fadeOutStart, end],
              [50, 0, 0, index === 4 ? 0 : -50]
            );

            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                className="absolute inset-0 flex items-center px-6 md:px-12 pointer-events-none"
                style={{ opacity, y }}
              >
                <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-20 items-center">
                  <div className={!isEven ? 'md:order-2' : ''}>
                    <h2 className="text-3xl md:text-5xl font-display font-semibold text-white mb-6 leading-tight">
                      {item.title}
                    </h2>
                    <p className="text-lg md:text-xl text-white/70 leading-relaxed font-body">
                      {item.text}
                    </p>
                  </div>
                  <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ${!isEven ? 'md:order-1' : ''}`}>
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        {/* Footer */}
        <motion.div 
          className="absolute bottom-8 left-0 w-full text-center z-20 pointer-events-none"
          style={{ opacity: footerOpacity }}
        >
          <p className="text-white/50 font-body uppercase tracking-widest text-sm font-medium">
            A Cidade pertence ao povo
          </p>
        </motion.div>
      </div>
    </section>
  );
}
