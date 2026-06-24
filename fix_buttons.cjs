const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(/color="var\(--color-deep-green\)"\n\s*hoverText="var\(--color-warm-cream\)"/g, 'color="var(--color-deep-green)"\n            textColor="var(--color-warm-cream)"\n            hoverText="var(--color-horto-orange)"');

fs.writeFileSync('src/App.tsx', content);
