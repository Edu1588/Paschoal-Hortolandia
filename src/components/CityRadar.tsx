import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { Camera, MapPin, Send, AlertCircle } from 'lucide-react';
import { AnimatedButton } from './AnimatedButton';
import { ErrorBoundary } from 'react-error-boundary';

const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

interface Report {
  id: string;
  lat: number;
  lng: number;
  title: string;
}

const initialReports: Report[] = [
  { id: '1', lat: -22.8580, lng: -47.2201, title: 'Buraco na via' },
  { id: '2', lat: -22.8650, lng: -47.2150, title: 'Iluminação queimada' },
  { id: '3', lat: -22.8520, lng: -47.2250, title: 'Lixo acumulado' },
];

const MapMarkers = ({ reports }: { reports: Report[] }) => {
  return (
    <>
      {reports.map((report) => (
        <AdvancedMarker key={report.id} position={{lat: report.lat, lng: report.lng}} title={report.title}>
          <Pin background="#ea4335" borderColor="#b31412" glyphColor="#fff" />
        </AdvancedMarker>
      ))}
    </>
  );
};

export default function CityRadar() {
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');
  const [apiError, setApiError] = useState(false);

  React.useEffect(() => {
    (window as any).gm_authFailure = () => {
      setApiError(true);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;
    
    // Add a new mock pin slightly offset from center
    const newReport: Report = {
      id: Date.now().toString(),
      lat: -22.8580 + (Math.random() - 0.5) * 0.02,
      lng: -47.2201 + (Math.random() - 0.5) * 0.02,
      title: message,
    };
    
    setReports([...reports, newReport]);
    setMessage('');
    setStatus('success');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section className="py-24 px-6 bg-white relative overflow-hidden" id="radar">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-horto-orange">
            Radar da Cidade
          </span>
          <h2 className="mt-5 font-display font-semibold text-4xl md:text-5xl leading-[1.02] text-deep-green text-balance">
            Ajude a cuidar de Hortolândia
          </h2>
          <p className="mt-6 text-lg text-ink/65 leading-relaxed max-w-2xl mx-auto">
            Viu algo que precisa ser melhorado? Envie sua mensagem ou foto. O mapa abaixo mostra os pontos de atenção já reportados por outros moradores.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Form Side */}
          <div className="bg-off-white p-8 border border-ink/10 relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-horto-orange/10 rounded-bl-full" />
            
            <h3 className="font-display font-semibold text-2xl text-deep-green mb-6 flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-horto-orange" />
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
                  <Camera className="w-8 h-8 mb-2 group-hover:text-horto-orange transition-colors" />
                  <span className="text-sm">Clique para enviar imagem</span>
                  <input type="file" accept="image/*" className="hidden" />
                </div>
              </div>

              <AnimatedButton
                href="#"
                color="var(--color-horto-orange)"
                textColor="var(--color-warm-cream)"
                className="w-full justify-center !py-4"
              >
                Enviar Relato <Send className="w-4 h-4 ml-2" />
              </AnimatedButton>
            </form>
          </div>

          {/* Map Side */}
          <div className="h-[500px] md:h-full min-h-[500px] bg-gray-100 border border-ink/10 relative">
              {(!hasValidKey || apiError) && (
                <div className="absolute inset-0 z-50 bg-white/90 flex items-center justify-center p-8 backdrop-blur-sm">
                  <div className="text-center max-w-[520px] bg-white p-6 shadow-xl border border-red-100 rounded-lg">
                    <h3 className="font-semibold text-xl mb-4 text-red-600">Maps API Error / Missing Key</h3>
                    <p className="text-sm text-ink/70 mb-4">The Google Maps JavaScript API is not enabled for your API key, or the key is missing.</p>
                    <p className="text-sm text-ink/70 mb-2"><strong>Step 1:</strong> <a href="https://console.cloud.google.com/google/maps-apis/api-list" target="_blank" rel="noopener" className="underline text-blue-600">Enable Maps JavaScript API</a></p>
                    <p className="text-sm text-ink/70 mb-2"><strong>Step 2:</strong> Add your key as a secret in AI Studio:</p>
                    <ul style={{textAlign:'left',lineHeight:'1.8'}} className="text-sm text-ink/70 bg-gray-50 p-4 border border-ink/10">
                      <li>Open <strong>Settings</strong> (⚙️ gear icon, <strong>top-right corner</strong>)</li>
                      <li>Select <strong>Secrets</strong></li>
                      <li>Type <code>GOOGLE_MAPS_PLATFORM_KEY</code> as the secret name, press <strong>Enter</strong></li>
                      <li>Paste your API key as the value, press <strong>Enter</strong></li>
                    </ul>
                  </div>
                </div>
              )}
              
              <ErrorBoundary fallback={
                <div className="absolute inset-0 z-50 bg-white/90 flex items-center justify-center p-8">
                  <div className="text-center max-w-[520px]">
                    <h3 className="font-semibold text-xl mb-4 text-red-600">Maps API Error</h3>
                    <p className="text-sm text-ink/70 mb-4">An error occurred while loading the map. The API key may be invalid or not activated.</p>
                  </div>
                </div>
              }>
                {hasValidKey && (
                  <APIProvider apiKey={API_KEY} version="weekly" onLoad={() => console.log('Maps API loaded')}>
                    <Map
                      defaultCenter={{lat: -22.8580, lng: -47.2201}}
                      defaultZoom={13}
                      mapId="DEMO_MAP_ID"
                      internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                      style={{width: '100%', height: '100%'}}
                    >
                      <MapMarkers reports={reports} />
                    </Map>
                  </APIProvider>
                )}
              </ErrorBoundary>
            </div>
        </div>
      </div>
    </section>
  );
}
