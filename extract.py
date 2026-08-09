import re

def parse_snapshot(file_path, output_path, uid_prefix):
    with open(file_path, 'r', encoding='utf-8') as f:
        text = f.read()

    lines = text.split('\n')
    code_fragments = []
    # match uid=<prefix>_<num> StaticText "<content>"
    pattern = re.compile(rf'uid={uid_prefix}_\d+\s+StaticText\s+"(.*)"$')
    
    for line in lines:
        m = pattern.search(line)
        if m:
            content = m.group(1).replace('\\"', '"').replace('\\n', '\n')
            code_fragments.append(content)

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(''.join(code_fragments))

# Parse Component.tsx
parse_snapshot('C:/Users/hreya/.gemini/antigravity/brain/7c7c9d18-007b-41b5-be56-325b04d48c6d/.tempmediaStorage/snapshot_full_1786264768871.txt', 'Component.tsx', '11')

# Parse Usage.tsx
parse_snapshot('C:/Users/hreya/.gemini/antigravity/brain/7c7c9d18-007b-41b5-be56-325b04d48c6d/.tempmediaStorage/snapshot_full_1786264827507.txt', 'Usage.tsx', '20')
