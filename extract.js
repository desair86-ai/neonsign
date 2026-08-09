const fs = require('fs');

function parseSnapshot(filePath, outputPath, uidPrefix) {
    const text = fs.readFileSync(filePath, 'utf-8');
    const lines = text.split('\n');
    const codeFragments = [];
    const pattern = new RegExp(`uid=${uidPrefix}_\\d+\\s+StaticText\\s+"(.*)"$`);
    
    for (const line of lines) {
        const match = line.match(pattern);
        if (match) {
            let content = match[1].replace(/\\"/g, '"').replace(/\\n/g, '\n');
            if (content.trim().startsWith('//')) {
                content = `/* ${content.trim().substring(2)} */ `;
            }
            codeFragments.push(content);
        }
    }

    fs.writeFileSync(outputPath, codeFragments.join(''), 'utf-8');
}

parseSnapshot('C:/Users/hreya/.gemini/antigravity/brain/7c7c9d18-007b-41b5-be56-325b04d48c6d/.tempmediaStorage/snapshot_full_1786264768871.txt', 'Component.tsx', '11');
parseSnapshot('C:/Users/hreya/.gemini/antigravity/brain/7c7c9d18-007b-41b5-be56-325b04d48c6d/.tempmediaStorage/snapshot_full_1786264827507.txt', 'Usage.tsx', '20');
