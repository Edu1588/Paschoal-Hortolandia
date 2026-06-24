const fs = require('fs');

let content = fs.readFileSync('src/components/CityRadar.tsx', 'utf8');

// The user wants red/green details in the radar too
content = content.replace(/bg-horto-orange\/10 text-horto-orange/g, 'bg-[var(--color-mdb-red-light)]/10 text-[var(--color-mdb-red-light)]');
content = content.replace(/text-horto-orange/g, 'text-[var(--color-mdb-red-light)]');

fs.writeFileSync('src/components/CityRadar.tsx', content);
