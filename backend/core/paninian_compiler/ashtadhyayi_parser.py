"""
Ashtadhyayi Parser
Core engine to apply Paninian grammatical rules to input sequences.
This represents a multi-layered rule application (morphology -> syntax -> morphophonemics).
"""

from typing import List, Tuple
from core.paninian_compiler.shivasutra_lexer import ShivaSutraLexer

class RuleMatch(Exception): pass

class AshtadhyayiParser:
    def __init__(self):
        self.lexer = ShivaSutraLexer()
        self.rules = self._load_rules()

    def _load_rules(self):
        """
        Mock implementation of loading the 4000 rules. 
        In reality, this would load a directed graph of rules addressing derivation.
        """
        return [
            # 6.1.77: iko yan aci (ik -> yan before ac)
            {"id": "6.1.77", "type": "sandhi", "condition": ("ik", "ac"), "substitution": "yan"},
            # 6.1.87: ad gunah (a/A + ik -> guna)
            {"id": "6.1.87", "type": "sandhi", "condition": ("a", "ik"), "substitution": "guna"},
            # 6.1.101: akah savarne dirghah (ak + savarna -> dirgha)
            {"id": "6.1.101", "type": "sandhi", "condition": ("ak", "ak"), "substitution": "dirgha"}
        ]

    def _get_substitution(self, lhs: str, rhs: str, rule_type: str) -> str:
        """Determines the specific phonetic substitution based on phonological proximity (sthantaratamah)"""
        # A full implementation calculates articulatory distance. Here we use a lookup.
        if rule_type == "guna":
            if rhs in ["i", "I"]: return "e"
            if rhs in ["u", "U"]: return "o"
            if rhs in ["R"]: return "ar"
            if rhs in ["L"]: return "al"
        elif rule_type == "yan":
            if lhs in ["i", "I"]: return "y"
            if lhs in ["u", "U"]: return "v"
            if lhs in ["R"]: return "r"
            if lhs in ["L"]: return "l"
        return lhs + rhs # fallback

    def parse_sequence(self, tokens: List[str]) -> List[str]:
        """
        Recursively applies grammatical rules to a sequence of tokens.
        """
        result = list(tokens)
        changed = True
        
        while changed:
            changed = False
            for i in range(len(result) - 1):
                t1 = result[i]
                t2 = result[i+1]
                
                # Check 6.1.87 (Guna Sandhi: a + i = e)
                if t1 == 'a' and t2 in self.lexer.generate_pratyahara("ik"):
                    sub = self._get_substitution(t1, t2, "guna")
                    result[i:i+2] = [sub]
                    changed = True
                    break
                
                # Check 6.1.77 (Yan Sandhi: i + a = ya)
                if t1 in self.lexer.generate_pratyahara("ik") and t2 in self.lexer.generate_pratyahara("ac"):
                    # Assuming they are not savarna (homogenous)
                    if t1 != t2:
                        sub = self._get_substitution(t1, t2, "yan")
                        result[i:i+2] = [sub, t2] # 'i' becomes 'y', 'a' remains
                        changed = True
                        break
        
        return result

if __name__ == "__main__":
    parser = AshtadhyayiParser()
    print("a + i ->", parser.parse_sequence(["a", "i"]))
    print("i + a ->", parser.parse_sequence(["i", "a"]))
