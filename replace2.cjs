const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace(/color="#00e676"/g, 'color="var(--color-horto-orange)"');

fs.writeFileSync('src/App.tsx', content);
