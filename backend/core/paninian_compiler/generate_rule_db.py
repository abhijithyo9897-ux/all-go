"""
Rule Database Generator
Procedurally generates a large JSON database mimicking the ~4,000 rules 
of the Ashtadhyayi for compiler load-testing and scale demonstration.
"""
import json
import itertools
import random
import os

def generate():
    rules = []
    
    # 1. Base phonetic classes (pratyaharas) we might combine
    vowels = ['a', 'A', 'i', 'I', 'u', 'U', 'R', 'RR', 'L', 'e', 'ai', 'o', 'au']
    consonants = ['k', 'kh', 'g', 'gh', 'N', 'c', 'ch', 'j', 'jh', 'ny', 
                  'T', 'Th', 'D', 'Dh', 'N', 't', 'th', 'd', 'dh', 'n',
                  'p', 'ph', 'b', 'bh', 'm', 'y', 'r', 'l', 'v', 
                  'S', 's', 'sh', 'h']
                  
    # Seed the known crucial rules first
    rules.append({
        "id": "6.1.77",
        "type": "sandhi",
        "lhs_class": "ik",
        "rhs_class": "ac",
        "substitution_type": "yan",
        "description": "iko yan aci"
    })
    
    rules.append({
        "id": "6.1.87",
        "type": "sandhi",
        "lhs_class": "a",
        "rhs_class": "ik",
        "substitution_type": "guna",
        "description": "ad gunah"
    })

    # 2. Generate systematic permutations for mock rules
    # This simulates the vast matrix of morphophonemic rules
    rule_id_counter = 1
    
    # Sandhi permutations
    for v1 in vowels:
        for v2 in vowels:
            if v1 != v2:
                rules.append({
                    "id": f"8.mock.{rule_id_counter}",
                    "type": "sandhi",
                    "lhs_class": v1,
                    "rhs_class": v2,
                    "substitution_type": random.choice(["guna", "vrddhi", "yan", "dirgha", "purvarupa"]),
                    "description": f"Generated combinatorial sandhi {v1} + {v2}"
                })
                rule_id_counter += 1

    # Morphology permutations (simulating subanta/tinganta suffixes)
    suffixes = ['su', 'au', 'jas', 'am', 'auT', 'shas', 'Ta', 'bhyam', 'bhis', 'tip', 'tas', 'jhi']
    for c in consonants:
        for s in suffixes:
            rules.append({
                "id": f"3.mock.{rule_id_counter}",
                "type": "morphology",
                "stem_ending": c,
                "suffix": s,
                "substitution_type": "lopa" if random.random() > 0.8 else "guna",
                "description": f"Generated morphological rule for {c} with {s}"
            })
            rule_id_counter += 1

    # Continue generating abstract rules to hit exactly 4,000 to prove scale
    while len(rules) < 4000:
        rules.append({
            "id": f"x.mock.{rule_id_counter}",
            "type": "syntax",
            "condition_A": random.choice(vowels),
            "condition_B": random.choice(consonants),
            "action": "entangle",
            "description": "Abstract generated syntactical entanglement rule"
        })
        rule_id_counter += 1

    # Truncate exactly at 4,000 for the demonstration
    rules = rules[:4000]

    output_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "ashtadhyayi_db.json")
    with open(output_path, 'w') as f:
        json.dump({"metadata": {"count": len(rules), "version": "1.0-RND"}, "rules": rules}, f, indent=2)
        
    print(f"[+] Successfully generated {len(rules)} algebraic rules in {output_path}")

if __name__ == "__main__":
    generate()
