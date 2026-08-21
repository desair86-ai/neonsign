const fs = require('fs');
let c = fs.readFileSync('src/components/clone/Header.tsx', 'utf-8');
c = c.replace(/\{ label: '([^']+)', href: '\/shop-neon-collection\?cat=[^']+' \}/g, (m, p) => {
  return `{ label: '${p}', href: '/shop-neon-collection?cat=${p.toLowerCase().replace(/[^a-z0-9]+/g, '-')}' }`;
});
fs.writeFileSync('src/components/clone/Header.tsx', c);
