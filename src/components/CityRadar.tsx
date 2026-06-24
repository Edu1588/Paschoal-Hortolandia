import React, { useState } from 'react';
import { Camera, MapPin, Send, AlertCircle } from 'lucide-react';
import { AnimatedButton } from './AnimatedButton';

const bairros = [
  { name: "Jardim Amanda", count: 142 },
  { name: "Jardim Rosolém", count: 98 },
  { name: "Nova Hortolândia", count: 87 },
  { name: "Vila Real", count: 65 },
  { name: "Jd. N. Sra. de Fátima", count: 54 },
  { name: "Jardim São Bento", count: 43 },
];

export default function CityRadar() {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;
    
    setMessage('');
    setStatus('success');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section className="py-24 px-6 bg-white relative overflow-hidden" id="radar">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-mdb-red-light)]">
            Radar da Cidade
          </span>
          <h2 className="mt-5 font-display font-semibold text-4xl md:text-5xl leading-[1.02] text-deep-green text-balance">
            Ajude a cuidar de Hortolândia
          </h2>
          <p className="mt-6 text-lg text-ink/65 leading-relaxed max-w-2xl mx-auto">
            Viu algo que precisa ser melhorado? Envie sua mensagem ou foto. O mapa abaixo mostra os pontos de atenção já reportados por outros moradores.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Form Side */}
          <div className="bg-off-white p-8 border border-ink/10 relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-horto-orange/10 rounded-bl-full" />
            
            <h3 className="font-display font-semibold text-2xl text-deep-green mb-6 flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-[var(--color-mdb-red-light)]" />
              Reportar Problema
            </h3>

            {status === 'success' ? (
              <div className="bg-[#00e676]/20 text-deep-green p-4 border border-[#00e676]/30 rounded-sm mb-6 font-semibold">
                Obrigado! Seu relato foi enviado com sucesso.
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-deep-green mb-2">
                  Qual o problema?
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ex: Buraco na rua X, poste apagado na rua Y..."
                  className="w-full bg-white border border-ink/15 px-4 py-3 focus:outline-none focus:border-horto-orange text-ink font-body resize-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-deep-green mb-2">
                  Anexar Foto (opcional)
                </label>
                <div className="border-2 border-dashed border-ink/20 bg-white p-6 flex flex-col items-center justify-center text-ink/60 hover:bg-ink/5 transition-colors cursor-pointer group">
                  <Camera className="w-8 h-8 mb-2 group-hover:text-[var(--color-mdb-red-light)] transition-colors" />
                  <span className="text-sm">Clique para enviar imagem</span>
                  <input type="file" accept="image/*" className="hidden" />
                </div>
              </div>

              <AnimatedButton
                type="submit"
                color="var(--color-horto-orange)"
                className="w-full justify-center !py-4"
              >
                Enviar Relato
              </AnimatedButton>
            </form>
          </div>

          {/* Ranking Side */}
          <div className="bg-white border border-ink/10 relative overflow-hidden flex flex-col pt-8 pb-4 h-[380px] max-w-md mx-auto w-full">
            <div className="text-center mb-6 relative z-20 shrink-0">
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-mdb-red-light)]">Locais Mais Denunciados</h4>
            </div>
            
            <div className="relative flex-1 overflow-hidden w-full px-6">
              <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
              
              <div className="flex flex-col items-center justify-start marquee-up-track space-y-4">
                {/* Duplicated for smooth infinite scroll */}
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center space-y-4 w-full">
                    {bairros.map((bairro, j) => (
                      <div key={j} className="flex items-center justify-between text-sm md:text-base font-medium text-ink/80 bg-gray-50 py-3 px-5 rounded border border-ink/10 w-full shadow-sm">
                        <span>{bairro.name}</span>
                        <span className="text-xs font-bold bg-[var(--color-mdb-red-light)]/10 text-[var(--color-mdb-red-light)] px-2 py-1 rounded">
                          {bairro.count} relatos
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
