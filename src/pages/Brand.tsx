import React from 'react';

export default function Brand() {
  return (
    <div className="w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
      <div 
        className="relative w-full h-full"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          paddingTop: '56.25%',
          boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
          marginTop: '1.6em',
          marginBottom: '0.9em',
          overflow: 'hidden',
          borderRadius: '8px',
          willChange: 'transform'
        }}
      >
        <iframe 
          loading="lazy" 
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            border: 'none',
            padding: 0,
            margin: 0
          }}
          src="https://www.canva.com/design/DAHNsss2xOA/qvPFBqhsGWoNvoM79j6X8A/view?embed" 
          allowFullScreen={true}
          allow="fullscreen"
        />
      </div>
      <a 
        href="https://canva.link/paschoalhortolandia" 
        target="_blank" 
        rel="noopener noreferrer"
        className="absolute bottom-4 text-white/50 hover:text-white transition-colors text-sm font-sans"
      >
        Ver apresentação no Canva
      </a>
    </div>
  );
}
