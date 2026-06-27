"""
Ashtadhyayi Parser (Dynamic Database Engine)
Core engine to apply Paninian grammatical rules to input sequences.
Refactored to ingest a massive JSON dataset (4,000 rules) and process tokens dynamically.
"""

import json
import os
from typing import List, Tuple
from core.paninian_compiler.shivasutra_lexer import ShivaSutraLexer

class AshtadhyayiParser:
    def __init__(self):
        self.lexer = ShivaSutraLexer()
        self.rules = self._load_rules_db()
        self._build_fast_index()

    def _load_rules_db(self) -> List[dict]:
        """Loads the 4,000 rules from the JSON dataset."""
        db_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "ashtadhyayi_db.json")
        if not os.path.exists(db_path):
            raise FileNotFoundError("ashtadhyayi_db.json missing. Run generate_rule_db.py first.")
            
        with open(db_path, 'r') as f:
            data = json.load(f)
            return data["rules"]

    def _build_fast_index(self):
        """
        Builds a high-speed search index for the 4000 rules.
        In a real compiler, this is a directed graph (Trie) for O(1) or O(log N) lookups.
        """
        self.sandhi_rules = {}
        for rule in self.rules:
            if rule.get("type") == "sandhi":
                # Key by (lhs, rhs)
                key = (rule.get("lhs_class"), rule.get("rhs_class"))
                self.sandhi_rules[key] = rule

    def _get_substitution(self, lhs: str, rhs: str, rule_type: str) -> str:
        """Determines specific phonetic substitution based on phonological proximity."""
        if rule_type == "guna":
            if rhs in ["i", "I"]: return "e"
            if rhs in ["u", "U"]: return "o"
            if rhs in ["R", "RR"]: return "ar"
            if rhs in ["L"]: return "al"
        elif rule_type == "yan":
            if lhs in ["i", "I"]: return "y"
            if lhs in ["u", "U"]: return "v"
            if lhs in ["R", "RR"]: return "r"
            if lhs in ["L"]: return "l"
        return lhs + rhs # fallback

    def parse_sequence(self, tokens: List[str]) -> List[str]:
        """
        Applies Paninian algebraic rules recursively across the sequence.
        Now queries the 4,000 rule database to find matches.
        """
        result = list(tokens)
        changed = True
        
        while changed:
            changed = False
            for i in range(len(result) - 1):
                t1 = result[i]
                t2 = result[i+1]
                
                # Check for direct literal matches in the DB
                rule_match = self.sandhi_rules.get((t1, t2))
                
                if not rule_match:
                    # Check pratyahara (class) matches if literal fails
                    # E.g. 'a' + 'i' might trigger the 'a' + 'ik' rule
                    for key, rule in self.sandhi_rules.items():
                        lhs_class, rhs_class = key
                        
                        # Generate lists if they are pratyaharas
                        try:
                            lhs_list = self.lexer.generate_pratyahara(lhs_class) if len(lhs_class) > 1 else [lhs_class]
                            rhs_list = self.lexer.generate_pratyahara(rhs_class) if len(rhs_class) > 1 else [rhs_class]
                        except ValueError:
                            # Not a pratyahara
                            lhs_list = [lhs_class]
                            rhs_list = [rhs_class]

                        if t1 in lhs_list and t2 in rhs_list:
                            rule_match = rule
                            break

                if rule_match:
                    sub_type = rule_match.get("substitution_type")
                    sub = self._get_substitution(t1, t2, sub_type)
                    
                    if sub_type in ["guna", "vrddhi", "dirgha", "purvarupa"]:
                        # Both phonemes are replaced by a single substitute (ekadesha)
                        result[i:i+2] = [sub]
                    else:
                        # Only LHS is substituted (like yan)
                        result[i:i+2] = [sub, t2]
                        
                    print(f"[*] Rule {rule_match['id']} applied: {t1} + {t2} -> {result[i]} ({rule_match['description']})")
                    changed = True
                    break
        
        return result

if __name__ == "__main__":
    parser = AshtadhyayiParser()
    print("Testing parser against 4000-rule DB...")
    print("a + i ->", parser.parse_sequence(["a", "i"]))
    print("i + a ->", parser.parse_sequence(["i", "a"]))
