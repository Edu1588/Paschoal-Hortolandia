import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const manifestoContent = [
  {
    title: "Gestão e prioridades",
    text: "“O maior desafio do município não é a falta de recursos, mas a definição de prioridades e a eficiência na administração do dinheiro público. Hortolândia é uma das cidades mais prósperas do Estado de São Paulo. Seu orçamento anual aproxima-se de R$ 2 bilhões, um volume de recursos que poucos municípios brasileiros possuem.”",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop"
  },
  {
    title: "A riqueza que não chega à população",
    text: "“Hortolândia é uma das cidades mais prósperas do Estado de São Paulo. Hoje, possui um orçamento próximo de R$ 2 bilhões por ano, um privilégio que poucos municípios brasileiros possuem. Esse recurso poderia transformar nossa cidade em referência nacional em saúde, educação, segurança, mobilidade urbana, geração de empregos, esporte, cultura e qualidade de vida. Infelizmente, essa riqueza ainda não chegou à vida de muitas famílias.”",
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1600&auto=format&fit=crop"
  },
  {
    title: "Impacto do desperdício público",
    text: "“Cada real desperdiçado representa menos médicos, menos medicamentos, menos vagas em creches, menos segurança, menos infraestrutura, menos oportunidades para nossos jovens e menos qualidade de vida para milhares de famílias.”",
    image: "https://images.unsplash.com/photo-1541888086925-920a0b38bcfe?q=80&w=1600&auto=format&fit=crop"
  },
  {
    title: "O dinheiro público pertence ao povo",
    text: "“O dinheiro público não pertence ao prefeito, ao vice-prefeito ou a qualquer agente político. Esse dinheiro pertence ao povo e deve ser administrado exclusivamente em benefício da sociedade.”",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1600&auto=format&fit=crop"
  },
  {
    title: "Responsabilidade e esperança",
    text: "“Sempre acreditei que administrar recursos públicos é, antes de tudo, administrar a esperança das pessoas. Por trás de cada real arrecadado existem pessoas, famílias, sonhos e esperanças.”",
    image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=1600&auto=format&fit=crop"
  }
];

export function ManifestoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Fade smoothly over the first 16.6% (100vh out of 600vh)
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.166], [0, 1]);

  return (
    <section ref={containerRef} className="relative h-[600vh] -mt-[100vh] z-40" id="manifesto">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center pointer-events-none">
        
        {/* Fundo preto suave que sobrepõe a seção anterior */}
        <motion.div 
          className="absolute inset-0 bg-black z-0"
          style={{ opacity: backgroundOpacity }}
        />
        
        {/* Content containers */}
        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 py-24 flex items-center">
          {manifestoContent.map((item, index) => {
            // First 16.6% is for background fade. Remaining 83.4% divided by 5 items = 16.68% per item
            const start = 0.166 + (index * 0.1668);
            const fadeUpEnd = start + 0.04;
            const fadeOutStart = start + 0.1268;
            const end = start + 0.1668;

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
      </div>
    </section>
  );
}
