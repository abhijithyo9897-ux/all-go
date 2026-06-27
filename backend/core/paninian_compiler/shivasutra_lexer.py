"""
Shiva Sutra Lexer
Generates Pratyaharas (phoneme classes) dynamically using the 14 Maheshvara Sutras.
This is the foundational layer for Ashtadhyayi rules, bypassing static lists for algebraic generation.
"""

class ShivaSutraLexer:
    def __init__(self):
        # The 14 Maheshvara Sutras (simplified representation for parsing)
        self.sutras = [
            "a i u N",
            "R L k",
            "e o M",
            "ai au c",
            "h y v r T",
            "l N",
            "ny m ng n n m",
            "jh bh ny",
            "gh Dh dh S",
            "j b g D d S",
            "kh ph ch Th th c T t v",
            "k p y",
            "S S s r",
            "h l"
        ]
        self._build_index()

    def _build_index(self):
        self.phonemes = []
        self.anubandhas = {}  # Marker letters at the end of sutras
        
        for i, sutra in enumerate(self.sutras):
            parts = sutra.split()
            core = parts[:-1]
            marker = parts[-1]
            
            start_idx = len(self.phonemes)
            self.phonemes.extend(core)
            self.anubandhas[marker] = len(self.phonemes) - 1 # Points to the last phoneme before it

    def generate_pratyahara(self, pratyahara: str) -> list[str]:
        """
        Algebraically expands a pratyahara (e.g. 'ak', 'ac', 'ik') into its constituent phonemes.
        """
        if len(pratyahara) < 2:
            return []
            
        start_char = pratyahara[:-1] # Usually first char, but can be multiple if transliterated like 'ai'
        end_marker = pratyahara[-1]
        
        if end_marker not in self.anubandhas:
            raise ValueError(f"Invalid Anubandha (marker): {end_marker}")
            
        try:
            start_idx = self.phonemes.index(start_char)
        except ValueError:
            raise ValueError(f"Start character {start_char} not found in Shiva Sutras")
            
        end_idx = self.anubandhas[end_marker]
        
        if start_idx > end_idx:
            raise ValueError("Start index comes after end index in the sutra order.")
            
        return self.phonemes[start_idx:end_idx + 1]

if __name__ == "__main__":
    lexer = ShivaSutraLexer()
    print("ac (all vowels):", lexer.generate_pratyahara("ac"))
    print("ik (simple vowels after a):", lexer.generate_pratyahara("ik"))
    print("hal (all consonants):", lexer.generate_pratyahara("hl"))
