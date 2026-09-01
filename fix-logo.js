const fs = require('fs');
let code = fs.readFileSync('src/components/home2/NeonLogo2.tsx', 'utf-8');

// Replace motion.div imports
code = code.replace(/import \{ motion \} from 'framer-motion';/, '');

// Replace opening motion.div
code = code.replace(/<motion\.div[\s\S]*?>/, <div className={\elative w-full h-full \\}>);

// Replace closing motion.div
code = code.replace(/<\/motion\.div>/g, '</div>');

// Replace style content
const newStyle = 
        .neon-single-layer path[stroke="#752EFF"], .neon-single-layer rect[stroke="#752EFF"], .neon-single-layer line[stroke="#752EFF"], .neon-single-layer path[fill="#BCA9FF"] {
          fill: #752EFF !important;
          filter: drop-shadow(0 0 10px rgba(117,46,255,0.5));
        }

        .neon-single-layer path[fill="#6EFF86"], .neon-single-layer line[stroke="#6EFF86"] {
          fill: #6EFF86 !important;
          filter: drop-shadow(0 0 10px rgba(110,255,134,0.5));
        }

        .neon-single-layer path[fill="#FFFFFF"] {
          filter: drop-shadow(0 0 2px rgba(255,255,255,0.6));
        }
;

code = code.replace(/<style dangerouslySetInnerHTML=\{\{ __html: \[\s\S]*?\ \}\} \/>/, <style dangerouslySetInnerHTML={{ __html: \${newStyle}\ }} />);

fs.writeFileSync('src/components/home2/NeonLogo2.tsx', code);
console.log('done');
