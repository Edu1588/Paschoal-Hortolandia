const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace(/textColor="var\(--color-warm-cream\)"/g, 'textColor="var(--color-ink)"');

fs.writeFileSync('src/App.tsx', content);
