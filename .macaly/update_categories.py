import re

# Category mapping by ID
# Rules from user:
# - Scott(1), Paul Steinman(2), Paul Schneider(3) → leadership, strategy, operations
# - Dara Schechter(42) → brand-communication, strategy
# - Nicole Arakorpi(31) → brand-communication, strategy, technology
# - Renee Barone(20) → brand-communication
# - Ben Rawlins(11) → technology
# - Accounting people → operations
# - No one else in leadership or brand-communication
# - Everyone else based on role

CATEGORY_MAP = {
    1:  ['leadership', 'strategy', 'operations'],           # Scott Rawlins - Transportation Programs
    2:  ['leadership', 'strategy', 'operations'],           # Paul Steinman - Construction Programs
    3:  ['leadership', 'strategy', 'operations'],           # Paul Schneider - Federal Programs
    4:  ['operations'],                                      # Mark Geib - Operations Programs
    5:  ['strategy', 'operations'],                          # Janine Cooper - Asset Management (strategic + operational)
    6:  ['technology', 'strategy'],                          # April Blackburn - Technology Strategy
    7:  ['operations'],                                      # Allison Black - Operational Change Management
    8:  ['strategy', 'operations'],                          # David Rader - Asset Management (strategic + operational)
    9:  ['operations'],                                      # Amy Neidringhaus - Program Management
    10: ['operations'],                                      # Ron Crew - Right-of-Way Operations
    11: ['technology'],                                      # Ben Rawlins - Chief AI Strategy Officer
    12: ['operations'],                                      # Sarah Rawlins - Chief Culture Officer
    13: ['operations'],                                      # Lisa Marsh - Maintenance & Operations Advisor
    14: ['operations'],                                      # Chris Petersen - Project Management
    15: ['operations'],                                      # Lauren LeJeune - Administration & Contract Management
    16: ['operations'],                                      # Ann Scott - Administrative Analyst
    17: ['technology'],                                      # Alicia McConnell - Aerial Technologies
    18: ['strategy', 'operations'],                          # Steve Cook - Operations Strategic Planning
    19: ['operations'],                                      # Debbie Cmar - Professional Services
    20: ['brand-communication'],                             # Renee Barone - Graphic Designer
    21: ['strategy'],                                        # Barbara Davis - Planning & Policy Advisor
    22: ['operations'],                                      # Jenica Keller - Program & Project Management
    23: ['technology', 'strategy'],                          # John Zuleger - Infrastructure Technologies Advisor
    24: ['strategy'],                                        # Amy Causseaux - Infrastructure Advisor
    25: ['strategy'],                                        # David Douglas - Infrastructure Advisor
    27: ['operations'],                                      # Ken Flore - Training & Curriculum Development
    28: ['operations'],                                      # Carissa McQuiston - Safety Operations Advisor
    29: ['operations'],                                      # Katie Wendel - Accounting Specialist
    30: ['strategy'],                                        # Jeffery Gallart - Strategic Programs
    31: ['brand-communication', 'strategy', 'technology'],   # Nicole Arakorpi - Web & Graphic Designer
    32: ['operations'],                                      # Skylar Granata - Accounting Specialist
    33: ['operations'],                                      # Stacie Hancock - Accounting Specialist
    34: ['strategy'],                                        # Mayela Sosa - Infrastructure Advisor
    35: ['strategy'],                                        # Jenna Brady - Infrastructure Advisor
    36: ['strategy'],                                        # Mark A. Johnson - Infrastructure Advisor
    37: ['technology'],                                      # Paul Wheeler - Aerial Innovation Advisor
    38: ['technology'],                                      # Aaron Organ - Aerial Technologies Advisor
    39: ['strategy'],                                        # Lance Grace - Infrastructure Advisor
    40: ['technology'],                                      # Samantha Lloyd - AI & Automation Specialist
    41: ['strategy'],                                        # Andy Palanisamy - Infrastructure Advisor
    42: ['brand-communication', 'strategy'],                 # Dara Schechter - Strategic Communications
    43: ['strategy'],                                        # Jennifer (Jen) Pihl - Infrastructure Advisor
    44: ['strategy'],                                        # Bob Eatmon - Infrastructure Advisor
    45: ['strategy', 'operations'],                          # Ken M. McEntire - Highway Operations & Maintenance
    46: ['strategy'],                                        # Ozzy Bravo - Infrastructure Advisor
    47: ['strategy'],                                        # Dara Wheeler - Infrastructure Advisor
    48: ['technology'],                                      # Kiara Pienaar - Automation Tester & Content Creator
    49: ['strategy'],                                        # Corey Biddle - Infrastructure Advisor
    50: ['operations'],                                      # Jenn Breitner - Administrative Assistant
    51: ['technology'],                                      # Kobus Pieters - AI & Automation Specialist
}

with open('lib/team-data.ts', 'r') as f:
    content = f.read()

# For each ID, find the block and replace the categories line
for member_id, cats in CATEGORY_MAP.items():
    cats_str = ', '.join(f"'{c}'" for c in cats)
    # Match: id: <number>, ... categories: [...]
    # We find the id line and then the next categories line
    pattern = rf"(id: {member_id},\n(?:.*\n)*?)\s*categories: \[.*?\],"
    
    def replacer(m):
        prefix = m.group(1)
        return f"{prefix}    categories: [{cats_str}],"
    
    new_content = re.sub(pattern, replacer, content, count=1)
    if new_content == content:
        print(f"WARNING: No match for id {member_id}")
    content = new_content

with open('lib/team-data.ts', 'w') as f:
    f.write(content)

print("Done! Categories updated.")

# Verify
for member_id in CATEGORY_MAP:
    pattern = rf"id: {member_id},"
    if pattern not in content.replace('\n', ''):
        # simpler check
        pass

# Count categories
from collections import Counter
cat_counts = Counter()
for cats in CATEGORY_MAP.values():
    for c in cats:
        cat_counts[c] += 1

print("\nCategory counts:")
for cat, count in sorted(cat_counts.items()):
    print(f"  {cat}: {count}")
