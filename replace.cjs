const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// The user wants the most evident colors to be black and yellow, with details in green and some red.
// - Backgrounds/Text were deep-green, now they are black (because of our index.css mapping).
// - Subheadings were yellow (horto-orange), let's change some to green and red.

content = content.replace(/text-xs font-semibold uppercase tracking-\[0\.25em\] text-horto-orange/g, 'text-xs font-semibold uppercase tracking-[0.25em] text-inst-green');
content = content.replace(/text-\[10px\] font-semibold uppercase tracking-\[0\.25em\] text-horto-orange/g, 'text-[10px] font-semibold uppercase tracking-[0.25em] text-inst-green');

// Add some red details. 
// E.g., the quotes border, the "Acompanhe a jornada" span
content = content.replace(/border-horto-orange/g, 'border-[var(--color-mdb-red-light)]');

// Change the "Radar" highlight to red or green
content = content.replace(/bg-horto-orange\/10 text-horto-orange/g, 'bg-[var(--color-mdb-red-light)]/10 text-[var(--color-mdb-red-light)]');

// Change the hero title text to yellow instead of white
content = content.replace(/text-warm-cream max-w-4xl mx-auto/g, 'text-horto-orange max-w-4xl mx-auto');

fs.writeFileSync('src/App.tsx', content);
