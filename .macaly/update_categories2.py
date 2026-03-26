import re

CATEGORY_MAP = {
    1:  ['leadership', 'strategy', 'operations'],
    2:  ['leadership', 'strategy', 'operations'],
    3:  ['leadership', 'strategy', 'operations'],
    4:  ['operations'],
    5:  ['strategy', 'operations'],
    6:  ['technology', 'strategy'],
    7:  ['operations'],
    8:  ['strategy', 'operations'],
    9:  ['operations'],
    10: ['operations'],
    11: ['technology'],
    12: ['operations'],
    13: ['operations'],
    14: ['operations'],
    15: ['operations'],
    16: ['operations'],
    17: ['technology'],
    18: ['strategy', 'operations'],
    19: ['operations'],
    20: ['brand-communication'],
    21: ['strategy'],
    22: ['operations'],
    23: ['technology', 'strategy'],
    24: ['strategy'],
    25: ['strategy'],
    27: ['operations'],
    28: ['operations'],
    29: ['operations'],
    30: ['strategy'],
    31: ['brand-communication', 'strategy', 'technology'],
    32: ['operations'],
    33: ['operations'],
    34: ['strategy'],
    35: ['strategy'],
    36: ['strategy'],
    37: ['technology'],
    38: ['technology'],
    39: ['strategy'],
    40: ['technology'],
    41: ['strategy'],
    42: ['brand-communication', 'strategy'],
    43: ['strategy'],
    44: ['strategy'],
    45: ['strategy', 'operations'],
    46: ['strategy'],
    47: ['strategy'],
    48: ['technology'],
    49: ['strategy'],
    50: ['operations'],
    51: ['technology'],
}

with open('lib/team-data.ts', 'r') as f:
    lines = f.readlines()

current_id = None
new_lines = []
updated_ids = set()

for line in lines:
    # Track current member ID
    id_match = re.match(r'\s+id:\s+(\d+),', line)
    if id_match:
        current_id = int(id_match.group(1))
    
    # Replace categories line for current member
    cat_match = re.match(r'(\s+)categories:\s*\[.*\],', line)
    if cat_match and current_id in CATEGORY_MAP:
        indent = cat_match.group(1)
        cats = CATEGORY_MAP[current_id]
        cats_str = ', '.join(f"'{c}'" for c in cats)
        new_lines.append(f"{indent}categories: [{cats_str}],\n")
        updated_ids.add(current_id)
    else:
        new_lines.append(line)

with open('lib/team-data.ts', 'w') as f:
    f.writelines(new_lines)

missing = set(CATEGORY_MAP.keys()) - updated_ids
if missing:
    print(f"WARNING: Could not find these IDs: {sorted(missing)}")
else:
    print(f"Success! Updated categories for all {len(updated_ids)} team members.")

# Verify counts
from collections import Counter
cat_counts = Counter()
for cats in CATEGORY_MAP.values():
    for c in cats:
        cat_counts[c] += 1

print("\nCategory counts:")
for cat, count in sorted(cat_counts.items()):
    print(f"  {cat}: {count}")
