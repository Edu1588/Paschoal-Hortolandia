const fs = require('fs');

let content = fs.readFileSync('src/index.css', 'utf8');

// Remove .animated-button from utilities
content = content.replace(/\.animated-button[\s\S]*?\.animated-button:active\s*\{\s*scale:\s*0\.95;\s*filter:\s*brightness\(0\.7\);\s*\}/, '');

fs.writeFileSync('src/index.css', content);
